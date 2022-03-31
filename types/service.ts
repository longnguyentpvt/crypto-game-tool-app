import { RouteId } from "../data/route";

export type ElemonNftSkill = {
  skillId : number,
  level : number,
  skillImg : string
}

export type ElemonBodyPart = {
  "type": number,
  "quality": number,
  "ability": number,
  "val": number
}

export type ElemonNft = {
  tokenId : string,
  lastPrice : number,
  ownerAddress : string,
  ownerName? : string,
  baseCardId : number,
  bodyPart1 : number,
  bodyPart2 : number,
  bodyPart3 : number,
  bodyPart4 : number,
  bodyPart5 : number,
  bodyPart6 : number,
  rarity? : number,
  purity? : number,
  class? : number,
  quality? : number,
  lastSynced? : number,
  price? : number,
  upgradeCost? : number,
  actualCost? : number,
  level? : number,
  point? : number,
  star? : number,
  skills? : ElemonNftSkill[],
  points? : number[],
  bodyPart? : ElemonBodyPart[],
  lockTime : number,
  maxPoint? : number,
  maxBodyStat? : number[]
}

export type MainHeaderMenuItem = {
  id : RouteId,
  name : string,
  url : string
}

export type HighestPurchasedPetInfo = {
  price : number,
  petInfo : ElemonNft
}
