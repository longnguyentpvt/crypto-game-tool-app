import {
  MainHeaderMenuItem
} from "../types/service";

export enum RouteId {
  HomePage = "homepage",
  ElemonMarket = "elemon-market",
  ElemonCalculator = "elemon-calculator",
}

export const DefaultMenu : MainHeaderMenuItem[] = [
  {
    id : RouteId.HomePage,
    name : "Home",
    url : "/"
  },
  {
    id : RouteId.ElemonMarket,
    name : "Elemon Market",
    url : "/elemon/market"
  },
  {
    id : RouteId.ElemonCalculator,
    name : "Elemon Pet Calculator",
    url : "/elemon/pets/calculator"
  }
]
