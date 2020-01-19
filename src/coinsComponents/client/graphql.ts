import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

const DaostackAlchemyClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/daostack/alchemy",
  fetch: fetch,
})

export const GraphqlClient = {
  DaostackAlchemyClient,
}
