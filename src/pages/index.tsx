import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../layout/layout"
import { CoinsQuery } from "../../types/graphql-types"
import CoinCard from "../components/coins/CoinCard"
import SEO from "../shared/seo"

const coinsQuery = graphql`
  query Coins {
    allCoinsJson {
      edges {
        node {
          name
          symbol
          coin_id
          image
        }
      }
    }
  }
`

const CoinsPage = () => {
  const { allCoinsJson } = useStaticQuery<CoinsQuery>(coinsQuery)

  return (
    <Layout>
      <SEO title="Home" />
      <div className="flex flex-row flex-wrap">
        {allCoinsJson.edges.map(({ node }, key) => {
          return (
            <div
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
              key={key}
            >
              <CoinCard {...node} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default CoinsPage
