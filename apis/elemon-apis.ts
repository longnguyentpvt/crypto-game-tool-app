import {
  default as axios
} from "axios";

import {
  ElemonNft
} from "../types/service";
import {
  ElemonLogActionType,
  ElemonMarketSortCriteria
} from "../types/enums";

let apiHost = "https://www.cryptogametool.com/apis/elemon/";
if (process.env.NODE_ENV !== "production") {
  apiHost = "http://localhost:8081/apis/elemon/";
}

const apiInstance = axios.create({
  baseURL : apiHost
});

export const getElemonNfts = async (
  page : number,
  pageSize : number,
  sortCri : ElemonMarketSortCriteria,
  asc : number,
  power : string,
  level : string,
  price : string,
  actualCost : string | null,
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
      price,
      actualCost,
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

export const getElemonPetInfo = async (tokenId : string) : Promise<ElemonNft | null> => {
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

export const getElemonPower = async (
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

export const getElemonUpgradeCost = async (
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

export const getElemonWallets = async (
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

export const getWalletLogs = async (
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

export const getPetSaleStatistics = async () : Promise<{
  date : number,
  noForSalePets : number,
  noSoldPets : number,
  noCancelPets : number,
  totalVolume : number
}[]> => {
  try {
    const params = {};

    const rp = await apiInstance.request({
      url : "/health/statistic",
      method : "get",
      params : params
    });

    return rp.data;
  } catch (e) {
  }

  return [];
};
