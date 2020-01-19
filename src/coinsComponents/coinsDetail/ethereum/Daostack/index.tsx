import React from "react"
import queryString from "query-string"
import { Location } from "@reach/router"
import { ProposalDetails } from "./Proposals"
import { DaosDetails } from "./Daos"

export const DaostackTab = () => {
  return (
    <Location>
      {({ location, navigate }) => {
        const search = queryString.parse(location.search)

        if (search.type && search.dao && search.type === "proposal") {
          return <ProposalDetails dao={search.dao as string} />
        }

        return <DaosDetails />
      }}
    </Location>
  )
}
