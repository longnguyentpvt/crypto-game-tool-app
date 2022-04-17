export type ComponentColor = "primary" | "secondary" | "warning" | "success" | "danger" | "muted" |
  "blue" | "light-blue" | "light-blue-2" | "dark-blue" | "green" | "light-green" | "dark-green" | "red" | "yellow" |
  "pink" | "purple" | "orange" | "white" | "gray" | "light-gray-1" | "light-gray-2" | "light-gray-3" | "light-gray-4" |
  "light-gray-5" |
  "dark-gray" | "black";

export enum ElemonMarketSortCriteria {
  PRICE = "price",
  ACTUAL_COST = "actualCost",
  POWER = "power",
  MAX_POWER = "maxPower",
  SPEED = "speed",
  MAX_SPEED = "maxSpeed",
  PATK = "patk",
  MAX_PATK = "maxPatk",
  MATK = "matk",
  MAX_MATK = "maxMatk",
  PDEF = "pdef",
  MAX_PDEF = "maxPdef",
  MDEF = "mdef",
  MAX_MDEF = "maxMdef",
  HP = "hp",
  MAX_HP = "maxHp"
}

export enum ElemonLogActionType {
  IDLE_CLAIM = "IDLE_CLAIM",
  PVE_FIGHT = "PVE_FIGHT",
  PVP_FIGHT = "PVP_FIGHT",
  NFT_HEAL = "NFT_HEAL",
}

export enum ElemonTopBodyFilter {
  POWER = "POWER",
  PART_1_POINT = "PART_1_POINT",
  PART_2_POINT = "PART_2_POINT",
  PART_3_POINT = "PART_3_POINT",
  PART_4_POINT = "PART_4_POINT",
  PART_5_POINT = "PART_5_POINT",
  PART_6_POINT = "PART_6_POINT"
}

export enum ELEMON_LEVEL_RANGE {
  U10 = "U10",
  U20 = "U20",
  U30 = "U30",
  U40 = "U40",
  U50 = "U50",
  U60 = "U60"
}

export enum ElemonRecentListType {
  LISTED = "LISTED",
  SOLD = "SOLD"
}

export enum CryptoToken {
  BUSD = "BUSD",
  ELMON = "ELMON"
}