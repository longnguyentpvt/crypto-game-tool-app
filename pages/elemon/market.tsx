import type { NextPage } from 'next';
import Head from 'next/head';
import {
  useState,
  ChangeEvent,
  useEffect,
  useRef
} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ElemonMarketSortCriteria } from "../../types/enums";
import { ElemonNft } from "../../types/service";

import {
  ElemonBaseCardInputs,
  ElemonRarityInputs,
  ElemonClassInputs,
  ElemonAuraInputs,
  ElemonBodyPartInputs
} from "../../data/input";

import {
  getElemonNfts
} from "../../apis/elemon-apis";
import {
  getClassImg,
  getElemonNftImg,
  getRarityImg,
  getSkillImg,
  getStatColor,
  getStatName
} from "../../services/elemon";
import { displayPriceWithComma } from "../../services/utils";
import MainHeader from "../../components/MainHeader";
import {
  DefaultMenu,
  RouteId
} from "../../data/route";
import Modal from "../../components/Modal";

const PAGE_SIZE = 30;

const ElemonMarket : NextPage = () => {
  const [
    sortType,
    setSortType
  ] = useState<number>(1);
  const [
    sortCriteria,
    setSortCriteria
  ] = useState<ElemonMarketSortCriteria>(ElemonMarketSortCriteria.PRICE);

  const [
    filterPrice,
    setFilterPrice
  ] = useState<number[]>([0, 100000]);
  const [
    filterActualPrice,
    setFilterActualPrice
  ] = useState<string[]>(["0", "100000"]);
  const [
    filterPower,
    setFilterPower
  ] = useState<number[]>([0, 20000000]);
  const [
    filterPowerMax,
    setFilterPowerMax
  ] = useState<number[]>([0, 20000000]);
  const [
    filterLevel,
    setFilterLevel
  ] = useState<number[]>([0, 60]);
  const [
    filterStar,
    setFilterStar
  ] = useState<number[]>([0, 10]);
  const [
    filterBodyMax,
    setFilterBodyMax
  ] = useState<Record<number, number[]>>({
    1 : [
      0,
      20000
    ],
    2 : [
      0,
      20000
    ],
    3 : [
      0,
      20000
    ],
    4 : [
      0,
      20000
    ],
    5 : [
      0,
      20000
    ],
    6 : [
      0,
      20000
    ]
  });

  const [
    baseCardIds,
    setBaseCardIds
  ] = useState<boolean[]>([]);
  const [
    rarityIds,
    setRarityIds
  ] = useState<boolean[]>([]);
  const [
    petClassIds,
    setPetClassIds
  ] = useState<boolean[]>([]);
  const [
    auraIds,
    setAuraIds
  ] = useState<boolean[]>([]);
  const [
    filterBodyParts,
    setFilterBodyParts
  ] = useState<number[]>([
    0,
    0,
    0,
    0,
    0,
    0
  ]);
  const [
    filterPurity,
    setFilterPurity
  ] = useState<number | undefined>(undefined);

  const [
    thankModalShow,
    setThankModalShow
  ] = useState<boolean>(false);

  const [
    nfts,
    setNfts
  ] = useState<ElemonNft[]>([]);

  const [
    pageNo,
    setPageNo
  ] = useState<number>(1);
  const [
    pageTotal,
    setPageTotal
  ] = useState<number>(0);
  const [
    pagingBottomWidth,
    setPagingBottomWidth
  ] = useState<number>(0);

  const pageInputRef = useRef<HTMLInputElement | null>(null);
  const petListElementRef = useRef<HTMLInputElement | null>(null);

  const toggleSortType = () => {
    setSortType(prevType => prevType === 0 ? 1 : 0);
  };

  const onFilterPriceChange = (e : ChangeEvent<HTMLInputElement>, idx : number) => {
    const val = e.target.value;
    const price = !!val ? parseInt(val) : 0;

    setFilterPrice(prevState => {
      prevState[idx] = price;
      return [...prevState];
    });
  };

  const onFilterActualPriceChange = (e : ChangeEvent<HTMLInputElement>, idx : number) => {
    const val = e.target.value;
    setFilterActualPrice(prevState => {
      prevState[idx] = val;
      return [...prevState];
    });
  };

  const onFilterPowerChange = (e : ChangeEvent<HTMLInputElement>, idx : number) => {
    const val = e.target.value;
    const price = !!val ? parseInt(val) : 0;

    setFilterPower(prevState => {
      prevState[idx] = price;
      return [...prevState];
    });
  };

  const onFilterPowerMaxChange = (e : ChangeEvent<HTMLInputElement>, idx : number) => {
    const val = e.target.value;
    const price = !!val ? parseInt(val) : 0;

    setFilterPowerMax(prevState => {
      prevState[idx] = price;
      return [...prevState];
    });
  };

  const onFilterLevelChange = (e : ChangeEvent<HTMLInputElement>, idx : number) => {
    const val = e.target.value;
    const price = !!val ? parseInt(val) : 0;

    setFilterLevel(prevState => {
      prevState[idx] = price;
      return [...prevState];
    });
  };

  const onFilterStarChange = (e : ChangeEvent<HTMLInputElement>, idx : number) => {
    const val = e.target.value;
    const price = !!val ? parseInt(val) : 0;

    setFilterStar(prevState => {
      prevState[idx] = price;
      return [...prevState];
    });
  };

  const onFilterBodyMaxChange = (e : ChangeEvent<HTMLInputElement>, partNo : number, idx : number) => {
    const val = e.target.value;
    const point = !!val ? parseInt(val) : 0;

    setFilterBodyMax(prevState => {
      const filter = [...prevState[partNo]];
      filter[idx] = point;
      return {
        ...prevState,
        [partNo] : filter
      };
    });
  };

  const onBaseCardIdToggle = (id : number) => {
    setBaseCardIds(prevState => {
      const newIds = [...prevState];
      newIds[id] = !newIds[id];

      return newIds;
    });
  };

  const onRarityIdToggle = (id : number) => {
    setRarityIds(prevState => {
      const newIds = [...prevState];
      newIds[id] = !newIds[id];

      return newIds;
    });
  };

  const onClassIdToggle = (id : number) => {
    setPetClassIds(prevState => {
      const newIds = [...prevState];
      newIds[id] = !newIds[id];

      return newIds;
    });
  };

  const onAuraIdToggle = (id : number) => {
    setAuraIds(prevState => {
      const newIds = [...prevState];
      newIds[id] = !newIds[id];

      return newIds;
    });
  };

  const onPurityToggle = (id : number) => {
    setFilterPurity(prevState => {
      if (prevState !== id) {
        return id;
      }

      return undefined;
    });
  };

  const filterBodyPartChange = (e : ChangeEvent<HTMLSelectElement>, idx : number) => {
    const val = e.target.value;

    setFilterBodyParts(prevState => {
      const newState = [...prevState];
      newState[idx] = parseInt(val);

      return newState;
    });
  };

  const onPageChange = () => {
    const val = pageInputRef.current?.value;

    if (!!val) {
      const pNo = !!val ? parseInt(val) : 1;
      setPageNo(pNo);
    }
  };

  const onPrevPage = () => {
    setPageNo(prevState => {
      if (prevState > 1) {
        const newState = prevState - 1;

        if (!!pageInputRef.current) {
          pageInputRef.current.value = newState + "";
        }

        return newState;
      }

      return prevState;
    });
  };
  const onNextPage = () => {
    setPageNo(prevState => {
      const newState = prevState + 1;

      if (!!pageInputRef.current) {
        pageInputRef.current.value = newState + "";
      }

      return newState;
    });
  };

  const toggleThankModal = () => {
    setThankModalShow(prevState => !prevState);
  };

  const apiNftLoadTimeoutFlag = useRef<NodeJS.Timeout | null>(null);
  const scheduleLoadTimeoutFlag = useRef<NodeJS.Timeout | null>(null);
  const prevPageNoRef = useRef<number>(1);
  useEffect(() => {
    if (!!scheduleLoadTimeoutFlag.current) {
      clearTimeout(scheduleLoadTimeoutFlag.current);
    }

    const load = (reload? : boolean) => {
      if (!!apiNftLoadTimeoutFlag.current) {
        clearTimeout(apiNftLoadTimeoutFlag.current);
      }
      scheduleLoadTimeoutFlag.current = setTimeout(() => load(true), 5000);

      let notPageChange = prevPageNoRef.current === pageNo;
      if (!reload && notPageChange && pageNo !== 1) {
        setPageNo(1);
        if (!!pageInputRef.current) {
          pageInputRef.current.value = "1";
        }
        return;
      }
      prevPageNoRef.current = pageNo;

      const power = filterPower.toString();
      const powerMax = filterPowerMax.toString();
      const level = filterLevel.toString();
      const price = filterPrice.toString();
      const star = filterStar.toString();
      const bodyMax1 = filterBodyMax[1].toString();
      const bodyMax2 = filterBodyMax[2].toString();
      const bodyMax3 = filterBodyMax[3].toString();
      const bodyMax4 = filterBodyMax[4].toString();
      const bodyMax5 = filterBodyMax[5].toString();
      const bodyMax6 = filterBodyMax[6].toString();
      // const bodyMax1 = null;
      // const bodyMax2 = null;
      // const bodyMax3 = null;
      // const bodyMax4 = null;
      // const bodyMax5 = null;
      // const bodyMax6 = "5000,20000";

      const minActualPrice = filterActualPrice[0];
      const maxActualPrice = filterActualPrice[1];
      const reg = /^-?\d+$/;
      let actualCost : string | null = null;
      if (reg.test(minActualPrice) && reg.test(maxActualPrice)) {
        actualCost = minActualPrice + "," + maxActualPrice;
      }

      const getParamFromArray = (inputs : boolean[]) : string | undefined => {
        let idParam : string | undefined;
        let ids : number[] = [];
        for (let i = 0, len = inputs.length; i < len; i++) {
          if (inputs[i]) {
            ids.push(i);
          }
        }
        if (ids.length > 0) {
          idParam = ids.toString();
        }

        return idParam;
      };

      const baseCardIdParam = getParamFromArray(baseCardIds);
      const rarityIdParam = getParamFromArray(rarityIds);
      const qualityIdParam = getParamFromArray(auraIds);
      const classIdParam = getParamFromArray(petClassIds);
      const bodyParts = filterBodyParts.map(part => !!part ? part : undefined);

      apiNftLoadTimeoutFlag.current = setTimeout(() => {
        getElemonNfts(
          pageNo,
          PAGE_SIZE,
          sortCriteria,
          sortType,
          power,
          powerMax,
          level,
          price,
          actualCost,
          bodyMax1,
          bodyMax2,
          bodyMax3,
          bodyMax4,
          bodyMax5,
          bodyMax6,
          star,
          filterPurity,
          baseCardIdParam,
          rarityIdParam,
          qualityIdParam,
          classIdParam,
          ...bodyParts
        ).then(({
          pets,
          total
        }) => {
          setNfts(pets);
          setPageTotal(total);
        });
      }, 300);
    };

    load();

    return function clean() {
      if (!!scheduleLoadTimeoutFlag.current) {
        clearTimeout(scheduleLoadTimeoutFlag.current);
      }

      if (!!apiNftLoadTimeoutFlag.current) {
        clearTimeout(apiNftLoadTimeoutFlag.current);
      }
    }
  }, [
    pageNo,
    sortCriteria,
    sortType,
    filterPower,
    filterPowerMax,
    filterLevel,
    filterPrice,
    filterActualPrice,
    filterBodyMax,
    filterStar,
    baseCardIds,
    rarityIds,
    petClassIds,
    auraIds,
    filterBodyParts,
    filterPurity
  ]);

  useEffect(() => {
    if (!!pageInputRef.current) {
      pageInputRef.current.value = "1";
    }

    const onPageSizeChange = () => {
      const width = petListElementRef.current?.clientWidth;
      !!width && setPagingBottomWidth(width);
    };
    window.addEventListener('resize', onPageSizeChange);
    onPageSizeChange();

    setTimeout(() => {
      setThankModalShow(true);
    }, 1000);

    return () => {
      window.removeEventListener('resize', onPageSizeChange);
    };
  }, []);

  return (
    <div id="main-app">
      <Head>
        <title>Elemon Market - Full Filters and Sorting at Crypto Game Tool</title>
        <meta
          name="description"
          content="Crypto Game Tool has built a NFT Market which supports useful filters and sorting for Elemon GameFi" />
        <link
          rel="icon"
          href="/assets/images/favicon.ico" />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Oxanium:wght@300;400;500;600;700&display=swap"
          rel="stylesheet" />

        {
          process.env.NODE_ENV === "production" ? (
            <>
              <script
                async
                src={ `https://www.googletagmanager.com/gtag/js?id=G-DS831RKYB5` } />
              <script
                dangerouslySetInnerHTML={ {
                  __html : `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', 'G-DS831RKYB5');`
                } }></script>
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6796254445247606"
                crossOrigin="anonymous"></script>
            </>
          ) : null
        }
      </Head>

      <div id="elemon-market-app">
        <MainHeader
          activeMenu={ RouteId.ElemonMarket }
          menuList={ DefaultMenu } />

        <div className="main-app-body">
          <div className="container position-relative">
            <div>
              <div className="left-filter-bar">
                <div className="d-flex flex-column h-100">
                  <div className="py-3 pe-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h1 className="h3 font-baloo mb-0 header-heading">
                          <div className="main">Elemon Market</div>
                          <div className="h6 mb-0 fw-light sub">
                            with full filters, sorting and fast result
                          </div>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex-fill"
                    style={ { minHeight : 0 } }>
                    <PerfectScrollbar
                      options={ {
                        suppressScrollX : true,
                        wheelPropagation : false
                      } }>
                      <div className="bar pe-4 pb-6">
                        <div className="filter-section">
                          <div className="section-title mb-2">
                            Sort
                          </div>
                          <div className="section-content">
                            <div className="row g-2 align-items-center">
                              <div className="col-6">
                                <div className="input-group">
                                  <select
                                    className="form-select"
                                    value={ sortCriteria }
                                    onChange={ e => setSortCriteria(e.target.value as ElemonMarketSortCriteria) }>
                                    <option value={ ElemonMarketSortCriteria.PRICE }>Selling Price</option>
                                    <option value={ ElemonMarketSortCriteria.ACTUAL_COST }>Actual Price</option>
                                    <option value={ ElemonMarketSortCriteria.POWER }>Power</option>
                                    <option value={ ElemonMarketSortCriteria.MAX_POWER }>Max Power</option>
                                    <option value={ ElemonMarketSortCriteria.HP }>HP</option>
                                    <option value={ ElemonMarketSortCriteria.MAX_HP }>Max HP</option>
                                    <option value={ ElemonMarketSortCriteria.PATK }>Physical Attack</option>
                                    <option value={ ElemonMarketSortCriteria.MAX_PATK }>Max P.Attack</option>
                                    <option value={ ElemonMarketSortCriteria.MATK }>Magical Attack</option>
                                    <option value={ ElemonMarketSortCriteria.MAX_MATK }>Max M.Attack</option>
                                    <option value={ ElemonMarketSortCriteria.PDEF }>Physical Def</option>
                                    <option value={ ElemonMarketSortCriteria.MAX_PDEF }>Max P.Def</option>
                                    <option value={ ElemonMarketSortCriteria.MDEF }>Magical Def</option>
                                    <option value={ ElemonMarketSortCriteria.MAX_MDEF }>Max M.Def</option>
                                    <option value={ ElemonMarketSortCriteria.SPEED }>Speed</option>
                                    <option value={ ElemonMarketSortCriteria.MAX_SPEED }>Max Speed</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="d-flex justify-content-end">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      onClick={ toggleSortType }
                                      readOnly
                                      checked={ sortType === 0 } />
                                    <label
                                      className="form-check-label">
                                      { sortType === 0 ? "High to Low" : "Low to High" }
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-section">
                          <div className="section-title mb-2">
                            Filter
                          </div>
                          <div className="section-content">
                            <div className="mb-2">
                              <div className="row g-2 align-items-center">
                                <div className="col-2">
                                  <div>
                                    Price
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterPrice[0] }
                                      onChange={ e => onFilterPriceChange(e, 0) }
                                      className="form-control"
                                      placeholder="Min" />
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterPrice[1] }
                                      onChange={ e => onFilterPriceChange(e, 1) }
                                      className="form-control"
                                      placeholder="Max" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="row g-2 align-items-center">
                                <div className="col-2">
                                  <div>
                                    Actual Price
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterActualPrice[0] }
                                      onChange={ e => onFilterActualPriceChange(e, 0) }
                                      className="form-control"
                                      placeholder="Min" />
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterActualPrice[1] }
                                      onChange={ e => onFilterActualPriceChange(e, 1) }
                                      className="form-control"
                                      placeholder="Max" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="row g-2 align-items-center">
                                <div className="col-2">
                                  <div>
                                    Power
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterPower[0] }
                                      onChange={ e => onFilterPowerChange(e, 0) }
                                      className="form-control"
                                      placeholder="Min" />
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterPower[1] }
                                      onChange={ e => onFilterPowerChange(e, 1) }
                                      className="form-control"
                                      placeholder="Max" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="row g-2 align-items-center">
                                <div className="col-2">
                                  <div>
                                    Max Power
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterPowerMax[0] }
                                      onChange={ e => onFilterPowerMaxChange(e, 0) }
                                      className="form-control"
                                      placeholder="Min" />
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterPowerMax[1] }
                                      onChange={ e => onFilterPowerMaxChange(e, 1) }
                                      className="form-control"
                                      placeholder="Max" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="row g-2 align-items-center">
                                <div className="col-2">
                                  <div>
                                    Level
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterLevel[0] }
                                      onChange={ e => onFilterLevelChange(e, 0) }
                                      className="form-control"
                                      placeholder="Min" />
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterLevel[1] }
                                      onChange={ e => onFilterLevelChange(e, 1) }
                                      className="form-control"
                                      placeholder="Max" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="row g-2 align-items-center">
                                <div className="col-2">
                                  <div>
                                    Star
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterStar[0] }
                                      onChange={ e => onFilterStarChange(e, 0) }
                                      className="form-control"
                                      placeholder="Min" />
                                  </div>
                                </div>
                                <div className="col-5">
                                  <div className="d-grid">
                                    <input
                                      type="text"
                                      value={ filterStar[1] }
                                      onChange={ e => onFilterStarChange(e, 1) }
                                      className="form-control"
                                      placeholder="Max" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-section">
                          <div className="section-title mb-2">
                            Name
                          </div>
                          <div className="section-content">
                            <div>
                              <div className="row g-2">
                                {
                                  ElemonBaseCardInputs.map(input => (
                                    <div
                                      className="col-4"
                                      key={ input.id }>
                                      <div className="d-grid">
                                        <input
                                          type="checkbox"
                                          className="btn-check"
                                          autoComplete="off"
                                          readOnly
                                          checked={ baseCardIds[input.id] } />
                                        <label
                                          onClick={ () => onBaseCardIdToggle(input.id) }
                                          className="btn btn-outline-primary btn-sm">
                                          { input.name }
                                        </label>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-section">
                          <div className="section-title mb-2">
                            Rarity
                          </div>
                          <div className="section-content">
                            <div>
                              <div className="row g-2">
                                {
                                  ElemonRarityInputs.map(input => (
                                    <div
                                      className="col-2"
                                      key={ input.id }>
                                      <div className="d-grid">
                                        <input
                                          type="checkbox"
                                          className="btn-check"
                                          readOnly
                                          checked={ rarityIds[input.id] }
                                          autoComplete="off" />
                                        <label
                                          onClick={ () => onRarityIdToggle(input.id) }
                                          className={ `btn btn-outline-${ input.color } btn-sm` }>
                                          { input.name }
                                        </label>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-section class-filter-section">
                          <div className="section-title mb-2">
                            Class
                          </div>
                          <div className="section-content">
                            <div>
                              <div className="row g-2">
                                {
                                  ElemonClassInputs.map(input => (
                                    <div
                                      className="col-4"
                                      key={ input.id }>
                                      <div
                                        className="form-check">
                                        <input
                                          className="form-check-input"
                                          onClick={ () => onClassIdToggle(input.id) }
                                          readOnly
                                          checked={ petClassIds[input.id] }
                                          type="checkbox"
                                          autoComplete="off" />
                                        <label
                                          className="form-check-label"
                                          onClick={ () => onClassIdToggle(input.id) }>
                                          <div className="d-flex align-items-center">
                                            <img
                                              className="option-img"
                                              src={ input.img } />
                                            <div className="flex-fill">
                                              <div className="option-name">
                                                { input.name }
                                              </div>
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-section aura-section">
                          <div className="section-title mb-2">
                            Aura
                          </div>
                          <div className="section-content">
                            <div>
                              <div className="row g-2">
                                {
                                  ElemonAuraInputs.map(input => (
                                    <div
                                      className="col-2"
                                      key={ input.id }>
                                      <div
                                        className="form-check">
                                        <input
                                          className="form-check-input"
                                          readOnly
                                          onClick={ () => onAuraIdToggle(input.id) }
                                          checked={ auraIds[input.id] }
                                          type="checkbox" />
                                        <label
                                          className="form-check-label"
                                          onClick={ () => onAuraIdToggle(input.id) }>
                                          <img
                                            className="option-img"
                                            src={ input.img } />
                                        </label>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-section body-filter-section">
                          <div className="section-title mb-2">
                            Body
                          </div>
                          <div className="section-content">
                            <div>
                              <div className="row g-2">
                                {
                                  ElemonBodyPartInputs.map(({
                                    img,
                                    id
                                  }) => {
                                    return (
                                      <div
                                        className="col-4"
                                        key={ id }>
                                        <select
                                          value={ filterBodyParts[id - 1] }
                                          onChange={ e => filterBodyPartChange(e, id - 1) }
                                          style={ { backgroundImage : `url(${ img })` } }
                                          className="form-select">
                                          <option value={ 0 }>Any</option>
                                          <option value={ 1 }>Common</option>
                                          <option value={ 2 }>UnCommon</option>
                                          <option value={ 3 }>Rare 1</option>
                                          <option value={ 4 }>Rare 2</option>
                                          <option value={ 5 }>Epic 1</option>
                                          <option value={ 6 }>Epic 2</option>
                                          <option value={ 7 }>Legend 1</option>
                                          <option value={ 8 }>Legend 2</option>
                                          <option value={ 9 }>Mythical</option>
                                        </select>
                                      </div>
                                    );
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="filter-section body-max-filter-section">
                          <div className="section-title mb-2">
                            Max Body Filter
                          </div>
                          <div className="section-content">
                            <div>
                              <div className="row g-2">
                                {
                                  ElemonBodyPartInputs.map(({
                                    id,
                                    name : inputName
                                  }) => {
                                    return (
                                      <div
                                        className="col-12"
                                        key={ id }>
                                        <div>
                                          <div className="row g-2 align-items-center">
                                            <div className="col-2">
                                              <div>
                                                { inputName }
                                              </div>
                                            </div>
                                            <div className="col-5">
                                              <div className="d-grid">
                                                <input
                                                  type="text"
                                                  value={ filterBodyMax[id][0] }
                                                  onChange={ e => onFilterBodyMaxChange(e, id, 0) }
                                                  className="form-control"
                                                  placeholder="Min" />
                                              </div>
                                            </div>
                                            <div className="col-5">
                                              <div className="d-grid">
                                                <input
                                                  type="text"
                                                  value={ filterBodyMax[id][1] }
                                                  onChange={ e => onFilterBodyMaxChange(e, id, 1) }
                                                  className="form-control"
                                                  placeholder="Min" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-section purity-filter-section">
                          <div className="section-title mb-2">
                            Purity
                          </div>
                          <div className="section-content">
                            <div>
                              <div className="row g-4">
                                <div className="col-auto">
                                  <div
                                    className="form-check">
                                    <input
                                      className="form-check-input"
                                      readOnly
                                      type="checkbox"
                                      onClick={ () => onPurityToggle(0) }
                                      checked={ filterPurity === 0 }
                                      autoComplete="off" />
                                    <label
                                      onClick={ () => onPurityToggle(0) }
                                      className="form-check-label">
                                      <img
                                        className="option-img"
                                        src="https://app.elemon.io/assets/images/purity_Hybrid.png" />
                                    </label>
                                  </div>
                                </div>
                                <div className="col-auto">
                                  <div
                                    className="form-check">
                                    <input
                                      className="form-check-input"
                                      readOnly
                                      type="checkbox"
                                      onClick={ () => onPurityToggle(1) }
                                      checked={ filterPurity === 1 }
                                      autoComplete="off" />
                                    <label
                                      onClick={ () => onPurityToggle(1) }
                                      className="form-check-label">
                                      <img
                                        className="option-img"
                                        src="https://app.elemon.io/assets/images/purity_Pure.png" />
                                    </label>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </PerfectScrollbar>
                  </div>
                </div>
              </div>

              <div className="right-result">
                <div className="pt-4">
                  <div
                    className="market-pet-list"
                    ref={ petListElementRef }>
                    <div className="row g-3">
                      {
                        nfts.map(nft => {
                          const {
                            tokenId,
                            quality,
                            baseCardId,
                            bodyPart1,
                            bodyPart2,
                            bodyPart3,
                            bodyPart4,
                            bodyPart5,
                            bodyPart6,
                            star,
                            rarity,
                            class : classId,
                            purity,
                            level,
                            point,
                            maxPoint,
                            price,
                            upgradeCost,
                            actualCost,
                            points,
                            maxBodyStat,
                            skills,
                            lockTime
                          } = nft;

                          const nftImg = getElemonNftImg(baseCardId, bodyPart1, bodyPart2, bodyPart3, bodyPart4, bodyPart5, bodyPart6);
                          const starImg = !!star ? `https://app.elemon.io/assets/images/star/star_level_${ star }.png` : "";
                          const rarityImg = !!rarity ? getRarityImg(rarity) : "";
                          const classImg = !!classId ? getClassImg(classId) : "";
                          const purityImg = `https://app.elemon.io/assets/images/purity_${ purity !==
                          0 ? "Pure" : "Hybrid" }.png`;
                          const pointStr = displayPriceWithComma(!!point ? point : 0);
                          const maxPointStr = displayPriceWithComma(!!maxPoint ? maxPoint : 0);
                          const priceStr = displayPriceWithComma(!!price ? price : 0, 2);
                          const upgradeCostStr = displayPriceWithComma(!!upgradeCost ? upgradeCost : 0, 2);
                          const actualCostStr = displayPriceWithComma(!!actualCost ? actualCost : 0, 2);
                          let lockDateStr = "";
                          if (!!lockTime) {
                            const noHours = lockTime / (60 * 60);
                            if (noHours >= 24) {
                              lockDateStr = Math.ceil(noHours / 24) + " days";
                            } else {
                              lockDateStr = Math.ceil(noHours) + " hours";
                            }
                          }

                          let bodyStats : {
                            type : number,
                            point : number,
                            maxPoint : number,
                            img : string,
                            name : string,
                            color : string
                          }[] = [];
                          if (!!points) {
                            bodyStats = [
                              {
                                type : 1,
                                point : points[0],
                                maxPoint : !!maxBodyStat ? maxBodyStat[0] : 0,
                                img : "https://app.elemon.io/assets/images/icon_hp.png",
                                name : getStatName(bodyPart1),
                                color : getStatColor(bodyPart1)
                              },
                              {
                                type : 2,
                                point : points[1],
                                maxPoint : !!maxBodyStat ? maxBodyStat[1] : 0,
                                img : "https://app.elemon.io/assets/images/icon_atk.png",
                                name : getStatName(bodyPart2),
                                color : getStatColor(bodyPart2)
                              },
                              {
                                type : 3,
                                point : points[2],
                                maxPoint : !!maxBodyStat ? maxBodyStat[2] : 0,
                                img : "https://app.elemon.io/assets/images/icon_spa.png",
                                name : getStatName(bodyPart3),
                                color : getStatColor(bodyPart3)
                              },
                              {
                                type : 4,
                                point : points[3],
                                maxPoint : !!maxBodyStat ? maxBodyStat[3] : 0,
                                img : "https://app.elemon.io/assets/images/icon_spd.png",
                                name : getStatName(bodyPart4),
                                color : getStatColor(bodyPart4)
                              },
                              {
                                type : 5,
                                point : points[4],
                                maxPoint : !!maxBodyStat ? maxBodyStat[4] : 0,
                                img : "https://app.elemon.io/assets/images/icon_def.png",
                                name : getStatName(bodyPart5),
                                color : getStatColor(bodyPart5)
                              },
                              {
                                type : 6,
                                point : points[5],
                                maxPoint : !!maxBodyStat ? maxBodyStat[5] : 0,
                                img : "https://app.elemon.io/assets/images/icon_speed.png",
                                name : getStatName(bodyPart6),
                                color : getStatColor(bodyPart6)
                              }
                            ];
                          }

                          return (
                            <div
                              className="col-12 col-xl-6 col-xxl-4"
                              key={ tokenId }>
                              <a
                                className="text-inherit"
                                href={ `https://app.elemon.io/elemon/${ tokenId }` }
                                target="_blank">
                                <div className="elemon-nft-card">
                                  <div className="card-body">
                                    <div className="top-content">
                                      <div className="d-flex align-items-center">
                                        <div className="nft-img">
                                          <div className="nft-id text-center">
                                            <span className="badge bg-warning">
                                              { tokenId }
                                            </span>

                                            {
                                              !!lockDateStr ? (
                                                <>
                                                  { " " }
                                                  <span className="badge bg-danger">{ lockDateStr }</span>
                                                </>
                                              ) : null
                                            }
                                          </div>
                                          <div
                                            className="nft-aura"
                                            style={ {
                                              backgroundImage : "url(https://app.elemon.io/assets/images/aura/quality_" +
                                                quality + ".png)"
                                            } }>
                                            <div
                                              className="img"
                                              style={ { backgroundImage : "url(" + nftImg + ")" } }>
                                            </div>
                                          </div>
                                          <div className="nft-star d-flex justify-content-center">
                                            {
                                              !!starImg ? (
                                                <img src={ starImg } />
                                              ) : null
                                            }
                                          </div>
                                        </div>

                                        <div className="flex-fill">
                                          <div className="ps-2">
                                            <div>
                                              <div className="row g-1 align-items-center justify-content-between">
                                                <div className="col-auto">
                                                  <div className="img-prop rarity-prop">
                                                    <img src={ rarityImg } />
                                                  </div>
                                                </div>
                                                <div className="col-auto">
                                                  <div>
                                                    <div className="row g-1">
                                                      <div className="col-auto">
                                                        <div className="img-prop class-prop">
                                                          <img src={ classImg } />
                                                        </div>
                                                      </div>
                                                      <div className="col-auto">
                                                        <div className="img-prop purity-prop">
                                                          <img src={ purityImg } />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-auto">
                                                  <div className="level-prop">
                                                    <div className="d-flex justify-content-end">
                                                      <div className="bg-primary rounded-circle level-circle">
                                                        <span className="fw-bold">{ level }</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="pt-3">
                                                <div className="row g-2 align-items-center">
                                                  <div className="col-auto">
                                                    <div className="pow-prop">
                                                      <div className="d-flex align-items-center">
                                                        <img src="https://app.elemon.io/assets/images/icon-power.png" />
                                                        <div>
                                                          <div className="ps-1">
                                                            { pointStr } / <span className="text-light-green">{ maxPointStr }</span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="pt-2">
                                                <div className="row g-1 align-items-center">
                                                  {
                                                    skills?.map(({
                                                      skillImg,
                                                      level,
                                                      skillId
                                                    }) => (
                                                      <div
                                                        className="col-3"
                                                        key={ skillId }>
                                                        <div className="skill-prop">
                                                          <div className="d-flex align-items-center">
                                                            <img src={ getSkillImg(skillImg) } />
                                                            <div>
                                                              <div className="ps-1">
                                                                { level }
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ))
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="body-stats pt-2">
                                        <div className="row g-1">
                                          {
                                            bodyStats.map(({
                                              point,
                                              maxPoint,
                                              type,
                                              img,
                                              name,
                                              color
                                            }) => {
                                              return (
                                                <div
                                                  className="col-4"
                                                  key={ type }>
                                                  <div className="body-stat">
                                                    <div className="d-flex align-items-center">
                                                      <div className="img">
                                                        <img src={ img } />
                                                      </div>

                                                      <div className="stat-info">
                                                        <div className={ `main text-${ color }` }>{ name }</div>
                                                        <div className="sub">{ point }</div>
                                                        <div className="max-sub text-light-green">{ maxPoint }</div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })
                                          }
                                        </div>
                                      </div>

                                      <div className="body-stats pt-1">
                                        <div className="row g-1">
                                          <div
                                            className="col-4">
                                            <div className="body-stat">
                                              <div className="d-flex align-items-center">
                                                <div className="img">
                                                  <img
                                                    style={ { padding : "2px" } }
                                                    src="https://app.elemon.io/assets/images/busd_ticker.png" />
                                                </div>

                                                <div className="stat-info">
                                                  <div className="text-yellow">Selling</div>
                                                  <div className="sub">{ priceStr }</div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="col-4">
                                            <div className="body-stat">
                                              <div className="d-flex align-items-center">
                                                <div className="img">
                                                  <img
                                                    style={ { padding : "2px" } }
                                                    src="https://app.elemon.io/assets/images/busd_ticker.png" />
                                                </div>

                                                <div className="stat-info">
                                                  <div className="text-orange">Upgrade</div>
                                                  <div className="sub">{ upgradeCostStr }</div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="col-4">
                                            <div className="body-stat">
                                              <div className="d-flex align-items-center">
                                                <div className="img">
                                                  <img
                                                    style={ { padding : "2px" } }
                                                    src="https://app.elemon.io/assets/images/busd_ticker.png" />
                                                </div>

                                                <div className="stat-info">
                                                  <div className="text-danger">Actual</div>
                                                  <div className="sub">{ actualCostStr }</div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

                <div
                  className="paging-bottom px-2"
                  style={ { width : pagingBottomWidth + "px" } }>
                  <div className="d-flex justify-content-between align-items-center paging-bottom-content">
                    <div>
                      { (pageNo - 1) * PAGE_SIZE + 1 } - { pageNo * PAGE_SIZE } of { pageTotal }
                    </div>
                    <div>
                      <div className="row g-3 align-items-center pagination">
                        <div className="col-auto">
                          <div
                            className="h3 mb-0 ctrl"
                            onClick={ onPrevPage }>
                            &laquo;
                          </div>
                        </div>
                        <div className="col-auto">
                          <input
                            style={ { width : "40px" } }
                            className="form-control text-center"
                            type="text"
                            onChange={ onPageChange }
                            ref={ pageInputRef } />
                        </div>
                        <div className="col-auto">
                          <div
                            className="h3 mb-0 pointer-event  ctrl"
                            onClick={ onNextPage }>
                            &raquo;
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal
        show={ thankModalShow }
        close={ toggleThankModal }>
        <div className="modal-body">
          <div className="text-center">
            <img
              style={ { width : "48px" } }
              src="/assets/images/main-logo.png"
              alt="Crypto Game Tool Logo" />
          </div>
          <div className="text-black pt-3">
            <div className="h5 text-center">
              Thanks for your visiting <a href="https://www.cryptogametool.com">Crypto Game Tool</a> website
            </div>

            <div className="pt-3 text-center">
              <p>
                We mainly build this platform for users can have a full functionality market
                for <a
                href="https://app.elemon.io/"
                target="_blank"
                rel="noreferrer">Elemon
                GameFi.</a> We are so sorry that there is ads during using our application, that is just for
                operating cost.
              </p>

              <br />

              We would love to hear more from your ideas or proposals. Please contact us at
              telegram <span className="text-danger">@CryptoGameTool</span>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={ toggleThankModal }
              type="button"
              className="btn btn-primary">
              Understand
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ElemonMarket;
