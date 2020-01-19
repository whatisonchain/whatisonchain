/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import "./layout.css"
import Layout from "./layout"
import {
  CoinStoreContext,
  CoinStoreModel,
  CoinStoreProvider,
} from "../store/CoinStore"

interface CoinLayoutProps {
  coinId: string
  name?: string
  symbol?: string
  image?: string
}

const CoinLayout: React.FC<CoinLayoutProps> = ({
  children,
  coinId,
  name,
  symbol,
  image,
}) => {
  const { coins, getCoinData } = React.useContext(CoinStoreContext)!

  React.useEffect(() => {
    getCoinData(coinId)
  }, [])

  const renderHeader = () => {
    if (!coins) return null
    const data = coins[coinId]
    const market_data = data?.market_data
    const priceChange = market_data?.price_change_percentage_24h_in_currency
      .usd!
    const priceChangeColor = priceChange > 0 ? "text-green-600" : "text-red-600"
    return (
      <div>
        <div className="flex flex-row items-center">
          <img
            style={{ width: "60px", height: "60px" }}
            src={image || data?.image.small}
            alt={coinId}
          />
          <h1 className="ml-3 text-5xl">{name || data?.name}</h1>
          <span className="ml-2 text-xl">
            ({(symbol || data?.symbol)?.toUpperCase()})
          </span>
        </div>
        {data && (
          <div className="flex flex-row items-center">
            <span className="text-xl">${market_data?.current_price.usd}</span>
            <span className="text-lg pl-1 pr-1">USD</span>
            <span className={`text-xl ${priceChangeColor}`}>
              ({priceChange} %)
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <Layout>
      {renderHeader()}
      {children}
    </Layout>
  )
}

export default (props: any) => (
  <CoinStoreProvider>
    <CoinLayout {...props} />
  </CoinStoreProvider>
)
