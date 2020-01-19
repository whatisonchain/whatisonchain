import React from "react"
import CoinLayout from "../layout/coinLayout"
import CoinDetailsRouter from "./CoinDetailsRouter"
import { CoinJson } from "../model/CoinJson"

interface CoinDetailsProps {
  path: string
  uri: string
  pageContext: {
    slug: string
    data: CoinJson
    subRoute: string
  }
  location: Location
}

const CoinDetails: React.FC<CoinDetailsProps> = ({
  pageContext: { slug, data, subRoute },
  location,
}) => {
  const coinId = slug

  return (
    <CoinLayout coinId={coinId} {...data}>
      <CoinDetailsRouter coinJson={data} coinId={coinId} subRoute={subRoute} />
    </CoinLayout>
  )
}

export default CoinDetails
