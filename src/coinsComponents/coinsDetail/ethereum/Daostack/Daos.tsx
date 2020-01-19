import React from "react"
import { Query } from "react-apollo"
import { GraphqlClient } from "../../../client/graphql"
import { gql } from "apollo-boost"
import { Link, navigate } from "gatsby"
import { SharedDao } from "./shared"

export const DaosDetails = () => {
  return (
    <Query<
      any,
      {
        orderBy: "numberOfExpiredInQueueProposals" | "reputationHoldersCount"
      }
    >
      client={GraphqlClient.DaostackAlchemyClient}
      variables={{ orderBy: "reputationHoldersCount" }}
      query={gql`
        query Daos($orderBy: String) {
          daos(orderBy: $orderBy, orderDirection: desc) {
            id
            name
            numberOfExpiredInQueueProposals
            reputationHoldersCount
          }
        }
      `}
    >
      {({ loading, data, error, refetch, variables }) => {
        if (loading) return <div>Loading...</div>
        if (error)
          return (
            <div>
              <p>Error to load</p>
            </div>
          )
        return (
          <div>
            <h3 className="text-center text-5xl">
              Daos sort by{" "}
              {variables.orderBy === "numberOfExpiredInQueueProposals"
                ? "Open Proposals"
                : "Reputation Holders"}
            </h3>

            <div>
              <div
                className="btn btn-purple text-center"
                onClick={() =>
                  refetch({
                    orderBy:
                      variables.orderBy === "numberOfExpiredInQueueProposals"
                        ? "reputationHoldersCount"
                        : "numberOfExpiredInQueueProposals",
                  })
                }
              >
                Change sort to{" "}
                {variables.orderBy === "numberOfExpiredInQueueProposals"
                  ? "Reputation Holders"
                  : "Open Proposals"}
              </div>
            </div>

            <div className="flex flex-row flex-wrap">
              {data.daos.map((d: any, key: number) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 my-3"
                  key={key}
                >
                  <div
                    className="p-2 box flex flex-col cursor-pointer hover:shadow-lg hover:bg-purple-200"
                    onClick={() => {
                      navigate(
                        `/coins/ethereum/daostack/?type=proposal&dao=${d.id}`
                      )
                    }}
                  >
                    <Link
                      to={`/coins/ethereum/daostack/?type=proposal&dao=${d.id}`}
                      className="text-lg text-purple-800 hover:underline flex flex-row"
                    >
                      {d.name}
                    </Link>
                    <SharedDao
                      reputationHoldersCount={d.reputationHoldersCount}
                      numberOfExpiredInQueueProposals={
                        d.numberOfExpiredInQueueProposals
                      }
                      id={d.id}
                    />
                    <Link
                      to={`/coins/ethereum/daostack/?type=proposal&dao=${d.id}`}
                      className="btn btn-purple flex justify-center"
                    >
                      {d.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    </Query>
  )
}
