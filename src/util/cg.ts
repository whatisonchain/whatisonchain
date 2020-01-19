import { CoinGeckoAPI } from "@coingecko/cg-api-ts"
import fetch from "isomorphic-fetch"

const windowGlobal: any = typeof window !== "undefined" && window

export const cg = new CoinGeckoAPI(
  windowGlobal ? windowGlobal.fetch.bind(window) : fetch
)
