import type { NextPage } from 'next';
import Head from 'next/head';
import {
  ChangeEvent,
  useEffect,
  useState,
  KeyboardEvent,
  useMemo,
  ReactElement,
  useRef
} from "react";

import {
  ElemonBaseCardInputs,
  ElemonRarityInputs,
  ElemonClassInputs,
  ElemonAuraInputs,
  ElemonBodyPartLevelInputs,
  ElemonBodyPartInputs
} from "../../../data/input";
import {
  getElemonPetInfo,
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
import GamingContentBorder from "../../../components/GamingContentBorder";
import { ElemonNft } from "../../../types/service";
import {
  getClassImg,
  getElemonNftImg,
  getRarityImg,
  getSkillImg
} from "../../../services/elemon";

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

const DefaultSelfInfo : ElemonNft = {
  tokenId : "",
  lastPrice : 0,
  ownerAddress : "",
  baseCardId : 0,
  bodyPart1 : 0,
  bodyPart2 : 0,
  bodyPart3 : 0,
  bodyPart4 : 0,
  bodyPart5 : 0,
  bodyPart6 : 0,
  lockTime : 0,
  star : 9,
  quality : 1,
  rarity : 1,
  class : 1,
  purity : 0,
  level : 0,
  points : [0, 0, 0, 0, 0, 0],
  skills : []
};

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
    selfPetConfig,
    setSelfPetConfig
  ] = useState<{
    level : number,
    star : number,
    skillLevel1 : number,
    skillLevel2 : number,
    skillLevel3 : number,
    skillLevel4 : number
  }>({
    level : 1,
    star : 0,
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
    noElmon : number,
    noElcoin : number,
    levelCost : number,
    skillCost : number,
    starCost : number,
    total : number
  }>({
    body : [0, 0, 0, 0, 0, 0],
    pow : 0,
    elcoinPrice : 0,
    elmonPrice : 0,
    noElmon : 0,
    noElcoin : 0,
    levelCost : 0,
    skillCost : 0,
    starCost : 0,
    total : 0
  });

  const [
    selfPetPowInfo,
    setSelfPetPowInfo
  ] = useState<{
    body : number[],
    pow : number,
    elcoinPrice : number,
    elmonPrice : number,
    noElcoin : number,
    noElmon : number,
    levelCost : number,
    skillCost : number,
    starCost : number,
    total : number
  }>({
    body : [0, 0, 0, 0, 0, 0],
    pow : 0,
    elcoinPrice : 0,
    elmonPrice : 0,
    noElmon : 0,
    noElcoin : 0,
    levelCost : 0,
    skillCost : 0,
    starCost : 0,
    total : 0
  });

  const [
    selfNftInfo,
    setSelfNftInfo
  ] = useState<ElemonNft>({
    ...DefaultSelfInfo
  });

  const [
    selfPetCostInfo,
    setSelfPetCostInfo
  ] = useState<{
    elcoinPrice : number,
    elmonPrice : number,
    levelCost : number,
    skillCost : number,
    starCost : number,
    total : number
  }>({
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

  const onSelfConfigChange = (e : ChangeEvent<HTMLSelectElement>, configName : string) : void => {
    setSelfPetConfig(prevState => (
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
      noElmon : 0,
      noElcoin : 0,
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
      noElmon,
      noElcoin,
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
      noElmon,
      noElcoin,
      levelCost,
      starCost,
      skillCost,
      total
    });
  };

  const calculateSelfPow = async () => {
    setSelfPetPowInfo({
      body : [-1, -1, -1, -1, -1, -1],
      pow : -1,
      elcoinPrice : -1,
      elmonPrice : -1,
      noElmon : 0,
      noElcoin : 0,
      levelCost : -1,
      starCost : -1,
      skillCost : -1,
      total : -1
    });

    const {
      level,
      star,
      skillLevel1,
      skillLevel2,
      skillLevel3,
      skillLevel4
    } = selfPetConfig;
    const {
      baseCardId,
      class : classId,
      rarity : rarityId,
      quality : qualityId,
      bodyPart1,
      bodyPart2,
      bodyPart3,
      bodyPart4,
      bodyPart5,
      bodyPart6,
      level : selfLevel,
      star : selfStar,
      skills : selfSkills
    } = selfNftInfo;

    let selfSkillLevel1 = -1,
      selfSkillLevel2 = -1,
      selfSkillLevel3 = -1,
      selfSkillLevel4 = -1;
    if (!!selfSkills) {
      selfSkillLevel1 = !!selfSkills[0] ? selfSkills[0].level : -1;
      selfSkillLevel2 = !!selfSkills[1] ? selfSkills[1].level : -1;
      selfSkillLevel3 = !!selfSkills[2] ? selfSkills[2].level : -1;
      selfSkillLevel4 = !!selfSkills[3] ? selfSkills[3].level : -1;
    }

    const [
      powInfo,
      upgradeInfo,
      selfUpgradeInfo
    ] = await Promise.all(
      [
        getElemonPower(
          star,
          level,
          baseCardId,
          !!rarityId ? rarityId : 1,
          !!qualityId ? qualityId : 1,
          !!classId ? classId : 1,
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
        ),
        getElemonUpgradeCost(
          !!selfStar ? selfStar : 1,
          !!selfLevel ? selfLevel : 1,
          selfSkillLevel1,
          selfSkillLevel2,
          selfSkillLevel3,
          selfSkillLevel4
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
      noElmon,
      noElcoin,
      levelCost,
      starCost,
      skillCost,
      total
    } = upgradeInfo;
    const {
      levelCost : selfLevelCost,
      starCost : selfStarCost,
      skillCost : selfSkillCost,
      total : selfTotal,
      noElmon : selfNoElmon,
      noElcoin : selfNoElcoin,
    } = selfUpgradeInfo;
    setSelfPetPowInfo({
      body : bodyPoints,
      pow,
      elcoinPrice,
      elmonPrice,
      noElmon : noElmon - selfNoElmon,
      noElcoin : noElcoin - selfNoElcoin,
      levelCost : levelCost - selfLevelCost,
      starCost : starCost - selfStarCost,
      skillCost : skillCost - selfSkillCost,
      total : total - selfTotal
    });
  };

  const loadSelfNftInfo = async (tokenId : string) => {
    setSelfNftInfo({
      ...DefaultSelfInfo,
      points : [-1, -1, -1, -1, -1, -1]
    });
    setSelfPetConfig({
      level : 1,
      star : 0,
      skillLevel1 : 1,
      skillLevel2 : -1,
      skillLevel3 : -1,
      skillLevel4 : -1
    });
    setSelfPetPowInfo({
      body : [0, 0, 0, 0, 0, 0],
      pow : 0,
      elcoinPrice : 0,
      elmonPrice : 0,
      noElmon : 0,
      noElcoin : 0,
      levelCost : 0,
      skillCost : 0,
      starCost : 0,
      total : 0
    });
    setSelfPetCostInfo({
      elcoinPrice : -1,
      elmonPrice : -1,
      levelCost : -1,
      skillCost : -1,
      starCost : -1,
      total : -1
    });

    const data = await getElemonPetInfo(tokenId);
    if (!!data) {
      setSelfNftInfo(data);

      const skills = data.skills;
      let skillLevel1 = -1,
        skillLevel2 = -1,
        skillLevel3 = -1,
        skillLevel4 = -1;
      if (!!skills) {
         skillLevel1 = skills[0] !== undefined ? skills[0].level : -1;
         skillLevel2 = skills[1] !== undefined ? skills[1].level : -1;
         skillLevel3 = skills[2] !== undefined ? skills[2].level : -1;
         skillLevel4 = skills[3] !== undefined ? skills[3].level : -1;
      }
      const level = !!data.level ? data.level : 1;
      const star = !!data.star ? data.star : 0;

      setSelfPetConfig({
        level : level,
        star : !!data.star ? data.star : 0,
        skillLevel1,
        skillLevel2,
        skillLevel3,
        skillLevel4,
      });

      const costInfo = await getElemonUpgradeCost(
        star,
        level,
        skillLevel1,
        skillLevel2,
        skillLevel3,
        skillLevel4
      );
      setSelfPetCostInfo({
        elcoinPrice : costInfo.elcoinPrice,
        elmonPrice :  costInfo.elmonPrice,
        levelCost : costInfo.levelCost,
        skillCost : costInfo.skillCost,
        starCost : costInfo.starCost,
        total : costInfo.total
      });
    } else {
      setSelfNftInfo({
        ...DefaultSelfInfo
      });
    }
  };

  const selfNftIdInputRef = useRef<HTMLInputElement>(null);
  const findSelfNft = (tokenId : string) => {
    const reg = new RegExp('^[0-9]+$');
    if (reg.test(tokenId)) {
      loadSelfNftInfo(tokenId);
    }
  };

  const onSelfNftIdInputKeyDown = (e : KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tokenId = (e.target as HTMLInputElement).value;
      findSelfNft(tokenId);
    }
  };

  const onFindButtonClick = () => {
    const tokenId = selfNftIdInputRef.current?.value;
    !!tokenId && findSelfNft(tokenId);
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

  const {
    baseCardId : selfBaseCardId,
    bodyPart1 : selfBodyPart1,
    bodyPart2 : selfBodyPart2,
    bodyPart3 : selfBodyPart3,
    bodyPart4 : selfBodyPart4,
    bodyPart5 : selfBodyPart5,
    bodyPart6 : selfBodyPart6,
    star : selfStar,
    quality : selfQuality,
    rarity : selfRarity,
    class : selfClassId,
    purity : selfPurity,
    level : selfLevel,
    point : selfPoint,
    maxPoint : selfMaxPoint,
    skills : selfSkills
  } = selfNftInfo;

  const selfNftImg = !!selfBaseCardId ? getElemonNftImg(
    selfBaseCardId,
    selfBodyPart1,
    selfBodyPart2,
    selfBodyPart3,
    selfBodyPart4,
    selfBodyPart5,
    selfBodyPart6
  ) : "";
  const selfStarImg = !!selfStar ? `https://app.elemon.io/assets/images/star/star_level_${ selfStar }.png` : "";
  const selfRarityImg = !!selfRarity ? getRarityImg(selfRarity) : "";
  const selfClassImg = !!selfClassId ? getClassImg(selfClassId) : "";
  const selfPurityImg = `https://app.elemon.io/assets/images/purity_${ selfPurity !== 0 ? "Pure" : "Hybrid" }.png`;

  const bodyPartElements = useMemo(() => {
    const {
      points : selfPoints,
      maxBodyStat : selfMaxBodyStat,
      bodyPart : selfBodyPart
    } = selfNftInfo;

    if (!!selfPoints) {
      const elements : ReactElement[] = [];
      for (let i = 0; i < 6; i++) {
        const bodyPartInput = ElemonBodyPartInputs[i];
        const bodyPoint = selfPoints[i];
        const maxBodyPoint = !!selfMaxBodyStat ? selfMaxBodyStat[i] : 0;
        const bodyLevel = !!selfBodyPart ? selfBodyPart[i].quality : 1;
        const bodyLevelInput = ElemonBodyPartLevelInputs[bodyLevel - 1];

        const element : ReactElement = <div
          key={ bodyPartInput.id }
          className="col-12 col-xl-4">
          <div className="d-flex align-items-center">
            <div>
              <div className="d-flex align-items-center">
                <div>
                  <img src={ bodyPartInput.img } />
                </div>
                <div>
                  <div className="h5 mb-0 point-label">{ bodyPartInput.name }</div>
                </div>
              </div>
              <div className={ `ps-2 text-${ bodyLevelInput.color }` }>
                { bodyLevelInput.name }
              </div>
            </div>
            <div className="mt-2">
              <div className="ps-2 h5 mb-0">
                <div className="text-yellow">
                  { bodyPoint >= 0 ? bodyPoint : "..." }
                </div>
                <div className="text-light-green mt-1">{ maxBodyPoint }</div>
              </div>
            </div>
          </div>
        </div>;

        elements.push(element);
      }

      return (
        <>
          { elements }
        </>
      );
    }

    return null;
  }, [
    selfNftInfo
  ]);

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
                <GamingContentBorder
                  name="Your Pet Calculator"
                  subDescription="Power & Upgrade Cost Calculator">
                  <div className="self-elemon-nft-calculator">
                    <div>
                      <div>
                        <div className="filter-line">
                          <div className="row g-2 align-items-xl-center">
                            <div className="col-12 col-xl-4">
                              <div className="mb-3">
                                <div className="h4 text-light-green">
                                  Your Pet Info
                                </div>
                              </div>

                              <label
                                className="form-label">
                                Enter your NFT ID to find
                              </label>
                              <div>
                                <div className="d-flex">
                                  <div>
                                    <input
                                      ref={ selfNftIdInputRef }
                                      type="text"
                                      className="form-control"
                                      placeholder="NFT ID"
                                      onKeyDown={ onSelfNftIdInputKeyDown } />
                                  </div>
                                  <div>
                                    <div className="ps-2">
                                      <button
                                        onClick={ onFindButtonClick }
                                        className="btn btn-primary">Find
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-auto col-xl-2">
                            </div>
                            <div className="col-12 col-xl-6 self-nft-common-detail">
                              <div>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <div className="self-nft-img">
                                      <div
                                        className="self-nft-aura"
                                        style={ {
                                          backgroundImage : "url(https://app.elemon.io/assets/images/aura/quality_" +
                                            selfQuality + ".png)"
                                        } }>
                                        {
                                          !!selfNftImg ? (
                                            <img
                                              className="img"
                                              src={ selfNftImg } />
                                          ) : (
                                            <div className="h1 p-4">
                                              ?
                                            </div>
                                          )
                                        }
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex-fill">
                                    <div className="ps-3 pt-2">
                                      <div className="mb-2">
                                        <div className="row g-3">
                                          <div className="col-auto">
                                            <img
                                              className="nft-class-img"
                                              src={ selfClassImg } />
                                          </div>

                                          <div className="col-auto">
                                            <img
                                              className="nft-purity-img"
                                              src={ selfPurityImg } />
                                          </div>

                                          <div className="col-auto">
                                            <div className="nft-level fw-bolder px-3">
                                              Level: { selfLevel }
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="row g-3">
                                          <div className="col-auto">
                                            <div className="nft-rarity-img-container">
                                              <img
                                                className="nft-rarity-img"
                                                src={ selfRarityImg } />
                                            </div>

                                          </div>
                                          <div className="col-auto">
                                            <img
                                              className="nft-star-img"
                                              src={ selfStarImg } />
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
                      <div className="mb-4 pt-3">
                        <div className="row g-3 align-items-center body-points">
                          <div className="col-9">
                            <div className="row g-3 align-items-center">
                              { bodyPartElements }
                            </div>
                          </div>
                          <div className="col-12 col-xl-3">
                            <div className="power-col">
                              <div className="text-xl-center">
                                <div className="text-danger h4 mb-0">
                                  { !!selfPoint ? displayPriceWithComma(selfPoint) : "0" }
                                </div>
                                <div className="text-light-green h4 mb-0">
                                  { !!selfMaxPoint ? displayPriceWithComma(selfMaxPoint) : "0" }
                                </div>
                                <div>
                                  <img src="https://app.elemon.io/assets/images/icon-power.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="row g-3 body-points">
                            {
                              selfSkills?.map((skill, idx) => (
                                <div
                                  key={ skill.skillId }
                                  className="col-12 col-xl-3">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <div className="skill-img">
                                        <img src={ getSkillImg(skill.skillImg) } />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="h5 mb-0 point-label">Skill { idx + 1 }</div>
                                    </div>
                                    <div>
                                      <div className="ps-2 h5 mb-0 text-yellow">{ skill.level } / 30</div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
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
                                    <div className="ps-2 h5 mb-0">
                                      <div className="text-yellow">
                                        {
                                          selfPetCostInfo.elmonPrice >= 0 ?
                                            displayPriceWithComma(selfPetCostInfo.elmonPrice, 2) + "$" :
                                            "..."
                                        }
                                      </div>
                                    </div>
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
                                    <div className="ps-2 h5 mb-0">
                                      <div className="text-yellow">
                                        {
                                          selfPetCostInfo.elcoinPrice >= 0 ?
                                            displayPriceWithComma(selfPetCostInfo.elcoinPrice, 4) + "$" :
                                            "..."
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4" />
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/body_part/2.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Star</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetCostInfo.starCost >=
                                    0 ? displayPriceWithComma(selfPetCostInfo.starCost, 2) + "$" : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/body_part/4.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Level</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetCostInfo.levelCost >=
                                    0 ? displayPriceWithComma(selfPetCostInfo.levelCost, 2) + "$" : "..." }</div>
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
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetCostInfo.skillCost >=
                                    0 ? displayPriceWithComma(selfPetCostInfo.skillCost, 2) + "$" : "..." }</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-xl-3">
                            <div className="power-col">
                              <div className="text-xl-center">
                                <div className="text-warning h3 mb-0">
                                  { selfPetCostInfo.total >= 0 ? displayPriceWithComma(selfPetCostInfo.total, 2) : "..." }
                                </div>
                                <div>
                                  <img src="https://app.elemon.io/assets/images/busd_ticker.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>
                        <div className="filter-line mb-4">
                          <div className="mb-3">
                            <div className="h4 text-light-green">
                              Upgrade Calculator
                            </div>
                          </div>

                          <div className="row g-2">
                            <div className="col-12 col-xl-2">
                              <label
                                className="form-label">
                                Level
                              </label>
                              <select
                                value={ selfPetConfig.level }
                                onChange={ e => onSelfConfigChange(e, "level") }
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
                                value={ selfPetConfig.star }
                                onChange={ e => onSelfConfigChange(e, "star") }
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
                                Skill 1
                              </label>
                              <select
                                value={ selfPetConfig.skillLevel1 }
                                onChange={ e => onSelfConfigChange(e, "skillLevel1") }
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
                                value={ selfPetConfig.skillLevel2 }
                                onChange={ e => onSelfConfigChange(e, "skillLevel2") }
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
                                value={ selfPetConfig.skillLevel3 }
                                onChange={ e => onSelfConfigChange(e, "skillLevel3") }
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
                                value={ selfPetConfig.skillLevel4 }
                                onChange={ e => onSelfConfigChange(e, "skillLevel4") }
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
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.body[0] >=
                                    0 ? selfPetPowInfo.body[0] : "..." }</div>
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
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.body[1] >=
                                    0 ? selfPetPowInfo.body[1] : "..." }</div>
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
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.body[2] >=
                                    0 ? selfPetPowInfo.body[2] : "..." }</div>
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
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.body[3] >=
                                    0 ? selfPetPowInfo.body[3] : "..." }</div>
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
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.body[4] >=
                                    0 ? selfPetPowInfo.body[4] : "..." }</div>
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
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.body[5] >=
                                    0 ? selfPetPowInfo.body[5] : "..." }</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-xl-3">
                            <div className="power-col">
                              <div className="text-xl-center">
                                <div className="text-danger h3 mb-0">
                                  { selfPetPowInfo.pow >= 0 ? displayPriceWithComma(selfPetPowInfo.pow) : "..." }
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
                                    <div className="ps-2 h5 mb-0">
                                      <div>
                                        { selfPetPowInfo.noElmon }
                                      </div>
                                      <div className="text-yellow">
                                        {
                                          selfPetPowInfo.elmonPrice >= 0 ?
                                            displayPriceWithComma(selfPetPowInfo.elmonPrice, 2) + "$" :
                                            "..."
                                        }
                                      </div>
                                    </div>
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


                                    <div className="ps-2 h5 mb-0">
                                      <div>
                                        { selfPetPowInfo.noElcoin }
                                      </div>
                                      <div className="text-yellow">
                                        {
                                          selfPetPowInfo.elcoinPrice >= 0 ?
                                            displayPriceWithComma(selfPetPowInfo.elcoinPrice, 4) + "$" :
                                            "..."
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4" />
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/body_part/2.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Star</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.starCost >=
                                    0 ? displayPriceWithComma(selfPetPowInfo.starCost, 2) + "$" : "..." }</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xl-4">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img src="https://app.elemon.io/assets/images/body_part/4.png" />
                                  </div>
                                  <div>
                                    <div className="h5 mb-0 point-label">Level</div>
                                  </div>
                                  <div>
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.levelCost >=
                                    0 ? displayPriceWithComma(selfPetPowInfo.levelCost, 2) + "$" : "..." }</div>
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
                                    <div className="ps-2 h5 mb-0 text-yellow">{ selfPetPowInfo.skillCost >=
                                    0 ? displayPriceWithComma(selfPetPowInfo.skillCost, 2) + "$" : "..." }</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-xl-3">
                            <div className="power-col">
                              <div className="text-xl-center">
                                <div className="text-warning h3 mb-0">
                                  { selfPetPowInfo.total >= 0 ? displayPriceWithComma(selfPetPowInfo.total, 2) : "..." }
                                </div>
                                <div>
                                  <img src="https://app.elemon.io/assets/images/busd_ticker.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={ calculateSelfPow }
                        type="button"
                        className="btn btn-game">
                        Calculate
                      </button>
                    </div>
                  </div>
                </GamingContentBorder>
              </div>

              <div className="mt-5">
                <GamingContentBorder
                  name="Elemon Nft Calculator"
                  subDescription="Power & Upgrade Cost Calculator">
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
                            Body 1 | HP
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
                            Body 2 | P.Attack
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
                            Body 3 | M.Attack
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
                            Body 4 | P.Def
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
                            Body 5 | M.Def
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
                            Body 6 | Speed
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
                                <div className="ps-2 h5 mb-0">
                                  <div>
                                    { petPowInfo.noElmon }
                                  </div>
                                  <div className="text-yellow">
                                    {
                                      petPowInfo.elmonPrice >= 0 ?
                                        displayPriceWithComma(petPowInfo.elmonPrice, 2) + "$" :
                                        "..."
                                    }
                                  </div>
                                </div>
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
                                <div className="ps-2 h5 mb-0">
                                  <div>
                                    { petPowInfo.noElcoin }
                                  </div>
                                  <div className="text-yellow">
                                    {
                                      petPowInfo.elcoinPrice >= 0 ?
                                        displayPriceWithComma(petPowInfo.elcoinPrice, 4) + "$" :
                                        "..."
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-4" />

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
                                0 ? displayPriceWithComma(petPowInfo.starCost, 2) + "$" : "..." }</div>
                              </div>
                            </div>
                          </div>
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
                                0 ? displayPriceWithComma(petPowInfo.levelCost, 2) + "$" : "..." }</div>
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
                                0 ? displayPriceWithComma(petPowInfo.skillCost, 2) + "$" : "..." }</div>
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
                </GamingContentBorder>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElemonPetPowCalculator;
