import React from "react"
import BitcoinPage from "./coinsDetail/bitcoin"
import SteemPage from "./coinsDetail/steem"
import EthereumPage from "./coinsDetail/ethereum"
import { CoinJson } from "../model/CoinJson"
import SteemDollarPage from "./coinsDetail/steem-dollars"
import DaiPage from "./coinsDetail/dai"

interface CoinDetailsRouterProps {
  coinId: string
  subRoute: string
  coinJson: CoinJson
}

const CoinDetailsRouter: React.FC<CoinDetailsRouterProps> = ({
  coinId,
  subRoute,
  coinJson,
}) => {
  switch (coinId) {
    case "bitcoin":
      return <BitcoinPage subRoute={subRoute} coinJson={coinJson} />
    case "steem":
      return <SteemPage subRoute={subRoute} coinJson={coinJson} />
    case "ethereum":
      return <EthereumPage subRoute={subRoute} coinJson={coinJson} />
    case "steem-dollars":
      return <SteemDollarPage subRoute={subRoute} coinJson={coinJson} />
    case "dai":
      return <DaiPage subRoute={subRoute} coinJson={coinJson} />
    default:
      return null
  }
}

export default CoinDetailsRouter
