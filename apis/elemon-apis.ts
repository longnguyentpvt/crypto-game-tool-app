import {
  default as axios
} from "axios";

import {
  ElemonNft,
  HighestPurchasedPetInfo
} from "types/service";
import {
  ELEMON_LEVEL_RANGE,
  ElemonLogActionType,
  ElemonMarketSortCriteria,
  ElemonRecentListType,
  ElemonTopBodyFilter
} from "types/enums";

let apiHost = process.env.NEXT_PUBLIC_MAIN_API_HOST + "/elemon/";

const apiInstance = axios.create({
  baseURL : apiHost
});

const getElemonNfts = async (
  page : number,
  pageSize : number,
  sortCri : ElemonMarketSortCriteria,
  asc : number,
  power : string,
  maxPower : string,
  level : string,
  price : string,
  actualCost : string | null,
  bodyMax1 : string | null,
  bodyMax2 : string | null,
  bodyMax3 : string | null,
  bodyMax4 : string | null,
  bodyMax5 : string | null,
  bodyMax6 : string | null,
  star : string,
  purity? : number,
  baseCardIds? : string,
  rarityIds? : string,
  qualityIds? : string,
  classIds? : string,
  bodyPart1? : number,
  bodyPart2? : number,
  bodyPart3? : number,
  bodyPart4? : number,
  bodyPart5? : number,
  bodyPart6? : number
) : Promise<{
  pets : ElemonNft[],
  total : number
}> => {
  try {
    const params = {
      page,
      pageSize,
      sortCri,
      asc,
      power,
      maxPower,
      price,
      actualCost,
      bodyMax1,
      bodyMax2,
      bodyMax3,
      bodyMax4,
      bodyMax5,
      bodyMax6,
      star,
      level,
      purity,
      baseCardIds,
      rarityIds,
      qualityIds,
      classIds,
      bodyPart1,
      bodyPart2,
      bodyPart3,
      bodyPart4,
      bodyPart5,
      bodyPart6
    };

    const rp = await apiInstance.request({
      url : "/market",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return {
    pets : [],
    total : 0
  };
};


const getElemonPetInfo = async (tokenId : string) : Promise<ElemonNft | null> => {
  try {
    const rp = await apiInstance.request({
      url : "/nft-info",
      method : "get",
      params : {
        tokenId
      }
    });

    return rp.data;
  } catch (e) {
  }

  return null;
};
const getElemonPower = async (
  star : number,
  level : number,
  baseCardId : number,
  rarityId : number,
  qualityId : number,
  classId : number,
  bodyPart1 : number,
  bodyPart2 : number,
  bodyPart3 : number,
  bodyPart4 : number,
  bodyPart5 : number,
  bodyPart6 : number,
  levelSkill1 : number,
  levelSkill2 : number,
  levelSkill3 : number,
  levelSkill4 : number,
) : Promise<{
  bodyPoints : number[],
  pow : number
}> => {
  try {
    const params = {
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
      levelSkill1,
      levelSkill2,
      levelSkill3,
      levelSkill4,
    };

    const rp = await apiInstance.request({
      url : "/pet/pow",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return {
    bodyPoints : [0, 0, 0, 0, 0, 0],
    pow : 0
  };
};

const getElemonUpgradeCost = async (
  star : number,
  level : number,
  levelSkill1 : number,
  levelSkill2 : number,
  levelSkill3 : number,
  levelSkill4 : number,
) : Promise<{
  elcoinPrice : number,
  elmonPrice : number,
  noElmon : number,
  noElcoin : number,
  levelCost : number,
  skillCost : number,
  starCost : number,
  total : number
}> => {
  try {
    const params = {
      star,
      level,
      levelSkill1,
      levelSkill2,
      levelSkill3,
      levelSkill4,
    };

    const rp = await apiInstance.request({
      url : "/pet/upgrade-cost",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return {
    elmonPrice : 0,
    elcoinPrice : 0,
    noElmon : 0,
    noElcoin : 0,
    levelCost : 0,
    skillCost : 0,
    starCost : 0,
    total : 0
  };
};

const getElemonWallets = async (
  username : string
) : Promise<{
  walletAddress : string,
  accountUsername : string,
  expirationDatetime : Date,
  logExpirationDatetime : Date,
  elemonName : string,
  level : number,
  power : number,
  energy : number,
  noClaimedIdles : number,
  noElcoin : number,
  pveChapter : string,
  lastClaimedIdleDateTime : Date,
  lastClaimedIdleElcoin : number,
  lastPveChapter : string,
  lastPveElcoin : number,
  lastPveDateTime : Date,
  lastPvpPower : number,
  lastPvpElcoin : number,
  lastPvpDateTime : Date,
  lastHealedDateTime : Date,
  lastHealedElcoin : string,
  pveQuestClaimed : number,
  pvpQuestClaimed : number
}[]> => {
  try {
    const params = {
      username
    };

    const rp = await apiInstance.request({
      url : "/account/wallets",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};

const getWalletLogs = async (
  accountId : string | null,
  wallet : string | null,
  actionType : ElemonLogActionType | undefined | null,
  from : string,
  to : string
) : Promise<{
  logId : number,
  walletAddress : string,
  actionDateTime : string,
  actionType : ElemonLogActionType,
  earnElcoin : number,
  logData : string,
  accPower : number,
  accLevel : number
}[]> => {
  try {
    const params = {
      accountId,
      wallet,
      actionType,
      from,
      to
    };

    const rp = await apiInstance.request({
      url : "/account/records",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};

const getPetSaleStatistics = async () : Promise<{
  date : number,
  noForSalePets : number,
  noSoldPets : number,
  noCancelPets : number,
  totalVolume : number
}[]> => {
  try {
    const params = {};

    const rp = await apiInstance.request({
      url : "/health/market",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};

const getOpeningBoxStatistics = async () : Promise<{
  boxId : number,
  pets : ElemonNft[],
  openTime : string
}[]> => {
  try {
    const params = {};

    const rp = await apiInstance.request({
      url : "/health/transactions/open-box",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};

const getCombiningPetStatistics = async () : Promise<{
  pet1 : ElemonNft,
  pet2 : ElemonNft,
  combinedPet : ElemonNft,
  combineTime : string
}[]> => {
  try {
    const params = {};

    const rp = await apiInstance.request({
      url : "/health/transactions/combine-pet",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};

const getPetCountStatistics = async () : Promise<{
  totalPet : number,
  levelRangeSortedPetMap : Record<ELEMON_LEVEL_RANGE, number>,
  noBurnedPet : number
}> => {
  try {
    const params = {};

    const rp = await apiInstance.request({
      url : "/health/pet-count",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return {
    totalPet : 0,
    levelRangeSortedPetMap : {} as Record<ELEMON_LEVEL_RANGE, number>,
    noBurnedPet : 0
  };
};

const getTopElemonPets = async (filter : ElemonTopBodyFilter) : Promise<ElemonNft[]> => {
  try {
    const params = {
      filter
    };

    const rp = await apiInstance.request({
      url : "/pet/top-pets",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};

const getTopHighestPricePets = async() : Promise<HighestPurchasedPetInfo[]> => {
  try {
    const rp = await apiInstance.request({
      url : "/health/top-purchased",
      method : "get"
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};

const getRecentPets = async(type : ElemonRecentListType, firstLoad : boolean, noRecords : number) : Promise<ElemonNft[]> => {
  try {
    const params = {
      type,
      firstLoad,
      noRecords
    };
    const rp = await apiInstance.request({
      url : "/latest-pets",
      method : "get",
      params
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};

const getPetMarketStatusCount = async() : Promise<{
  noSelling : number,
  noBurned : number,
  total : number
} | null> => {
  try {
    const rp = await apiInstance.request({
      url : "/health/pet-count/market-status",
      method : "get"
    });

    return rp.data;
  } catch (e) {
  }

  return null;
};

const getPetRarityCount = async() : Promise<Record<number, number> | null> => {
  try {
    const rp = await apiInstance.request({
      url : "/health/pet-count/rarity",
      method : "get"
    });

    return rp.data;
  } catch (e) {
  }

  return null;
};

const getPetAuraCount = async() : Promise<Record<number, number> | null> => {
  try {
    const rp = await apiInstance.request({
      url : "/health/pet-count/aura",
      method : "get"
    });

    return rp.data;
  } catch (e) {
  }

  return null;
};

export {
  getElemonNfts,
  getElemonPetInfo,
  getElemonPower,
  getElemonUpgradeCost,
  getElemonWallets,
  getWalletLogs,
  getPetSaleStatistics,
  getOpeningBoxStatistics,
  getCombiningPetStatistics,
  getPetCountStatistics,
  getTopElemonPets,
  getTopHighestPricePets,
  getRecentPets,
  getPetMarketStatusCount,
  getPetRarityCount,
  getPetAuraCount
};
