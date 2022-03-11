import type { NextPage } from 'next';
import Head from 'next/head';
import {
  ChangeEvent,
  useEffect,
  useState
} from "react";

import {
  ElemonBaseCardInputs,
  ElemonRarityInputs,
  ElemonClassInputs,
  ElemonAuraInputs,
  ElemonBodyPartLevelInputs
} from "../../../data/input";
import {
  getElemonPower,
  getElemonUpgradeCost
} from "../../../apis/elemon-apis";
import {
  displayPriceWithComma
} from "../../../services/utils";
import Script from "next/script";
import MainHeader from "../../../components/MainHeader";
import {
  DefaultMenu,
  RouteId
} from "../../../data/route";

const PetLevels : number[] = [];
for (let i = 1; i <= 60; i++) {
  PetLevels.push(i);
}
const StarLevels : number[] = [];
for (let i = 0; i <= 9; i++) {
  StarLevels.push(i);
}

const SkillLevels : number[] = [];
for (let i = -1; i <= 30; i++) {
  SkillLevels.push(i);
}

const ElemonPetPowCalculator : NextPage = () => {

  const [
    petConfig,
    setPetConfig
  ] = useState<{
    baseCardId : number,
    classId : number,
    level : number,
    star : number,
    rarityId : number,
    qualityId : number,
    bodyPart1 : number,
    bodyPart2 : number,
    bodyPart3 : number,
    bodyPart4 : number,
    bodyPart5 : number,
    bodyPart6 : number,
    skillLevel1 : number,
    skillLevel2 : number,
    skillLevel3 : number,
    skillLevel4 : number
  }>({
    baseCardId : 4,
    classId : 1,
    level : 1,
    star : 0,
    rarityId : 1,
    qualityId : 1,
    bodyPart1 : 1,
    bodyPart2 : 1,
    bodyPart3 : 1,
    bodyPart4 : 1,
    bodyPart5 : 1,
    bodyPart6 : 1,
    skillLevel1 : 1,
    skillLevel2 : -1,
    skillLevel3 : -1,
    skillLevel4 : -1
  });

  const [
    petPowInfo,
    setPetPowInfo
  ] = useState<{
    body : number[],
    pow : number,
    elcoinPrice : number,
    elmonPrice : number,
    levelCost : number,
    skillCost : number,
    starCost : number,
    total : number
  }>({
    body : [0, 0, 0, 0, 0, 0],
    pow : 0,
    elcoinPrice : 0,
    elmonPrice : 0,
    levelCost : 0,
    skillCost : 0,
    starCost : 0,
    total : 0
  });

  const onConfigChange = (e : ChangeEvent<HTMLSelectElement>, configName : string) : void => {
    setPetConfig(prevState => (
      {
        ...prevState,
        [configName] : parseInt(e.target.value)
      }
    ));
  };

  const calculatePow = async () => {
    setPetPowInfo({
      body : [-1, -1, -1, -1, -1, -1],
      pow : -1,
      elcoinPrice : -1,
      elmonPrice : -1,
      levelCost : -1,
      starCost : -1,
      skillCost : -1,
      total : -1
    });

    const {
      baseCardId,
      classId,
      level,
      star,
      rarityId,
      qualityId,
      bodyPart1,
      bodyPart2,
      bodyPart3,
      bodyPart4,
      bodyPart5,
      bodyPart6,
      skillLevel1,
      skillLevel2,
      skillLevel3,
      skillLevel4
    } = petConfig;

    const [
      powInfo,
      upgradeInfo
    ] = await Promise.all(
      [
        getElemonPower(
          star,
          level,
          baseCardId,
          rarityId,
          qualityId,
          classId,
          bodyPart1,
          bodyPart2,
          bodyPart3,
          bodyPart4,
          bodyPart5,
          bodyPart6,
          skillLevel1,
          skillLevel2,
          skillLevel3,
          skillLevel4
        ),
        getElemonUpgradeCost(
          star,
          level,
          skillLevel1,
          skillLevel2,
          skillLevel3,
          skillLevel4
        )
      ]
    );

    const {
      bodyPoints,
      pow
    } = powInfo;
    const {
      elcoinPrice,
      elmonPrice,
      levelCost,
      starCost,
      skillCost,
      total
    } = upgradeInfo;
    setPetPowInfo({
      body : bodyPoints,
      pow,
      elcoinPrice,
      elmonPrice,
      levelCost,
      starCost,
      skillCost,
      total
    });

  };

  const {
    baseCardId,
    classId,
    level,
    star,
    rarityId,
    qualityId,
    bodyPart1,
    bodyPart2,
    bodyPart3,
    bodyPart4,
    bodyPart5,
    bodyPart6,
    skillLevel1,
    skillLevel2,
    skillLevel3,
    skillLevel4
  } = petConfig;

  useEffect(() => {
    calculatePow();
  }, []);

  return (
    <div id="main-app">
      <Head>
        <title>Elemon GameFi - Pet Power & Upgrade Cost Calculator on Crypto Game Tool</title>
        <meta
          name="description"
          content="Based on Elemon Pet properties, the tool estimates body stats, power and upgrade cost for users can calculate their investment." />
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
            </>
          ) : null
        }
      </Head>

      <div id="elemon-power-calculator-app">
        <MainHeader
          activeMenu={ RouteId.ElemonCalculator }
          menuList={ DefaultMenu } />

        <div className="main-app-body">
          <div className="container">
            <div className="pt-5 pb-5">
              <div className="app-body-heading text-center">
                <h1 className="h2 fw-bold">Elemon Pet Power & Upgrade Cost Calculator</h1>
                <h2 className="h5 fw-normal">
                  The calculator tool helps users to estimate the power and upgrade cost of Elemon Pet based on its
                  properties
                </h2>
              </div>

              <div className="mt-5">
                <div className="border-background-content mx-auto">
                  <div className="content-border position-relative">
                    <div className="content-background">
                      <div className="d-flex flex-column h-100">
                        <div className="bg-head" />
                        <div
                          className="bg-body flex-fill"
                          style={ { minHeight : "0" } } />
                        <div className="bg-bottom" />
                      </div>
                    </div>

                    <div className="content-body">
                      <div>
                        <div className="filter-line mb-4">
                          <div className="row g-2">
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Name
                              </label>
                              <select
                                value={ baseCardId + "" }
                                onChange={ e => onConfigChange(e, "baseCardId") }
                                className="form-select">
                                {
                                  ElemonBaseCardInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Class
                              </label>
                              <select
                                value={ classId + "" }
                                onChange={ e => onConfigChange(e, "classId") }
                                className="form-select">
                                {
                                  ElemonClassInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Level
                              </label>
                              <select
                                value={ level }
                                onChange={ e => onConfigChange(e, "level") }
                                className="form-select">
                                {
                                  PetLevels.map(input => {
                                    return (
                                      <option
                                        key={ input }
                                        value={ input }>
                                        { input }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Star
                              </label>
                              <select
                                value={ star }
                                onChange={ e => onConfigChange(e, "star") }
                                className="form-select">
                                {
                                  StarLevels.map(input => {
                                    return (
                                      <option
                                        key={ input }
                                        value={ input }>
                                        { input }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Rarity
                              </label>
                              <select
                                value={ rarityId + "" }
                                onChange={ e => onConfigChange(e, "rarityId") }
                                className="form-select">
                                {
                                  ElemonRarityInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Aura
                              </label>
                              <select
                                value={ qualityId + "" }
                                onChange={ e => onConfigChange(e, "qualityId") }
                                className="form-select">
                                {
                                  ElemonAuraInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="filter-line mb-4">
                          <div className="row g-2">
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Body Part 1
                              </label>
                              <select
                                value={ bodyPart1 + "" }
                                onChange={ e => onConfigChange(e, "bodyPart1") }
                                className="form-select">
                                {
                                  ElemonBodyPartLevelInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Body Part 2
                              </label>
                              <select
                                value={ bodyPart2 + "" }
                                onChange={ e => onConfigChange(e, "bodyPart2") }
                                className="form-select">
                                {
                                  ElemonBodyPartLevelInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Body Part 3
                              </label>
                              <select
                                value={ bodyPart3 + "" }
                                onChange={ e => onConfigChange(e, "bodyPart3") }
                                className="form-select">
                                {
                                  ElemonBodyPartLevelInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Body Part 4
                              </label>
                              <select
                                value={ bodyPart4 + "" }
                                onChange={ e => onConfigChange(e, "bodyPart4") }
                                className="form-select">
                                {
                                  ElemonBodyPartLevelInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Body Part 5
                              </label>
                              <select
                                value={ bodyPart5 + "" }
                                onChange={ e => onConfigChange(e, "bodyPart5") }
                                className="form-select">
                                {
                                  ElemonBodyPartLevelInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Body Part 6
                              </label>
                              <select
                                value={ bodyPart6 + "" }
                                onChange={ e => onConfigChange(e, "bodyPart6") }
                                className="form-select">
                                {
                                  ElemonBodyPartLevelInputs.map(input => {
                                    return (
                                      <option
                                        key={ input.id }
                                        value={ input.id }>
                                        { input.name }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="filter-line">
                          <div className="row g-2">
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Skill 1
                              </label>
                              <select
                                value={ skillLevel1 }
                                onChange={ e => onConfigChange(e, "skillLevel1") }
                                className="form-select">
                                {
                                  SkillLevels.map(input => {
                                    return (
                                      <option
                                        key={ input }
                                        value={ input }>
                                        { input >= 0 ? `Level ${ input }` : "Not Available" }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Skill 2
                              </label>
                              <select
                                value={ skillLevel2 }
                                onChange={ e => onConfigChange(e, "skillLevel2") }
                                className="form-select">
                                {
                                  SkillLevels.map(input => {
                                    return (
                                      <option
                                        key={ input }
                                        value={ input }>
                                        { input >= 0 ? `Level ${ input }` : "Not Available" }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Skill 3
                              </label>
                              <select
                                value={ skillLevel3 }
                                onChange={ e => onConfigChange(e, "skillLevel3") }
                                className="form-select">
                                {
                                  SkillLevels.map(input => {
                                    return (
                                      <option
                                        key={ input }
                                        value={ input }>
                                        { input >= 0 ? `Level ${ input }` : "Not Available" }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Skill 4
                              </label>
                              <select
                                value={ skillLevel4 }
                                onChange={ e => onConfigChange(e, "skillLevel4") }
                                className="form-select">
                                {
                                  SkillLevels.map(input => {
                                    return (
                                      <option
                                        key={ input }
                                        value={ input }>
                                        { input >= 0 ? `Level ${ input }` : "Not Available" }
                                      </option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-top mt-4 mb-4 pt-3">
                        <div className="row g-3 align-items-center body-points">
                          <div className="col-9">
                            <div className="row g-3">
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/icon_hp.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">HP</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.body[0] >=
                                    0 ? petPowInfo.body[0] : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/icon_atk.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">P.Atk</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.body[1] >=
                                    0 ? petPowInfo.body[1] : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/icon_spa.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">M.Atk</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.body[2] >=
                                    0 ? petPowInfo.body[2] : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/icon_spd.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">P.Def</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.body[3] >=
                                    0 ? petPowInfo.body[3] : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/icon_def.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">M.Def</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.body[4] >=
                                    0 ? petPowInfo.body[4] : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img
                                      className="p-1"
                                      src="https://app.elemon.io/assets/images/icon_speed.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Speed</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.body[5] >=
                                    0 ? petPowInfo.body[5] : "..." }</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-xl-3">
                            <div className="power-col">
                              <div className="text-xl-center">
                                <div className="text-danger h3 mb-0">
                                  { petPowInfo.pow >= 0 ? displayPriceWithComma(petPowInfo.pow) : "..." }
                                </div>
                                <div>
                                  <img src="https://app.elemon.io/assets/images/icon-power.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row g-3 align-items-center body-points mt-3">
                          <div className="col-9">
                            <div className="row g-3">
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img
                                      className="p-1"
                                      src="https://app.elemon.io/assets/images/icon_header.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label p-1">Elmon</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.elmonPrice >=
                                    0 ? displayPriceWithComma(petPowInfo.elmonPrice, 2) : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img
                                      className="p-1"
                                      src="https://app.elemon.io/assets/images/swap/icon_ecoin.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Elcoin</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.elcoinPrice >=
                                    0 ? displayPriceWithComma(petPowInfo.elcoinPrice, 4) : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4" />
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/body_part/4.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Level</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.levelCost >=
                                    0 ? displayPriceWithComma(petPowInfo.levelCost, 2) : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/body_part/5.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Skill</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.skillCost >=
                                    0 ? displayPriceWithComma(petPowInfo.skillCost, 2) : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/body_part/2.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Star</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ petPowInfo.starCost >=
                                    0 ? displayPriceWithComma(petPowInfo.starCost, 2) : "..." }</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-xl-3">
                            <div className="power-col">
                              <div className="text-xl-center">
                                <div className="text-warning h3 mb-0">
                                  { petPowInfo.total >= 0 ? displayPriceWithComma(petPowInfo.total, 2) : "..." }
                                </div>
                                <div>
                                  <img src="https://app.elemon.io/assets/images/busd_ticker.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={ calculatePow }
                          type="button"
                          className="btn btn-game">
                          Calculate
                        </button>
                      </div>
                    </div>

                    <div className="border-heading d-none d-lg-block">
                      <div className="h4 mb-2">
                        CryptoGameTool
                      </div>
                      <div>
                        Power Calculator
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
  );
};

export default ElemonPetPowCalculator;
