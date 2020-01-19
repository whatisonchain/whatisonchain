import React from "react"
import SEO from "../shared/seo"
import { CoinJumbotron } from "./CoinJumbotron"

interface CoinTabProps {
  name: string
  description: string
  coinId: string
  Comp: () => JSX.Element
}

export const CoinTab: React.FC<CoinTabProps> = props => {
  return (
    <>
      <SEO
        title={props.coinId + " " + props.name}
        description={props.description}
      />
      {props.name && props.description && (
        <CoinJumbotron title={props.name} description={props.description} />
      )}
      <props.Comp />
    </>
  )
}
