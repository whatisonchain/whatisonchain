import React from "react"
import { cg } from "../util/cg"
import { ICoinsId } from "@coingecko/cg-api-ts"

type State = {
  coins: {
    [coinId: string]: ICoinsId
  }
}
type Action = { type: "ADD_COIN"; payload: { coinId: string; data: ICoinsId } }

export interface CoinStoreModel {
  coins: State["coins"]
  getCoinData: (coinId: string, refresh?: boolean) => Promise<ICoinsId>
}

export const CoinContext = React.createContext<CoinStoreModel | null>(null)
const { Provider } = CoinContext

export const CoinStoreProvider: React.FC = props => {
  const [{ coins }, dispatch] = React.useReducer(
    (
      state: State = {
        coins: {},
      },
      action: Action
    ) => {
      switch (action.type) {
        case "ADD_COIN":
          return {
            ...state,
            coins: {
              ...state.coins,
              [action.payload.coinId]: action.payload.data,
            },
          }
        default:
          return state
      }
    },
    {
      coins: {},
    }
  )

  const getCoinData = React.useCallback(
    async (coinId: string, refresh = false) => {
      if (coins[coinId] && !refresh) return coins[coinId]
      const { data } = await cg.getCoinsId(
        coinId,
        false,
        false,
        true,
        true,
        true,
        false,
        false
      )
      dispatch({
        type: "ADD_COIN",
        payload: {
          data,
          coinId,
        },
      })
      return data
    },
    []
  )

  return (
    <Provider value={{ coins: coins, getCoinData }}>{props.children}</Provider>
  )
}

export const CoinStoreContext = CoinContext
