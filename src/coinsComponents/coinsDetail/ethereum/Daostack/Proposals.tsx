import React, { useContext } from "react"
import { CoinJumbotron } from "../../../CoinJumbotron"
import { GraphqlClient } from "../../../client/graphql"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"
import { SharedDao, DaostackLogo } from "./shared"
import { EthereumClient } from "../../../client/ethereum"
import { CoinContext } from "../../../../store/CoinStore"
import BN from "bn.js"

export const ProposalDetails: React.FC<{ dao: string }> = ({ dao }) => {
  const [ethBalance, setEthBalance] = React.useState<BN | null>(null)
  const [usdBalance, setUsdBalance] = React.useState<BN | null>(null)
  const { coins, getCoinData } = useContext(CoinContext)!

  React.useEffect(() => {
    ;(async () => {
      const ethclient = new EthereumClient()
      await ethclient.init()
      const currentBalance = await ethclient.client.eth.getBalance(dao)
      const ten = new BN(10)
      const eth = new BN(currentBalance).div(ten.pow(new BN(18)))
      setEthBalance(eth)
    })()
  }, [dao])

  React.useEffect(() => {
    ;(async () => {
      if (!coins.ethereum) {
        await getCoinData("ethereum")
      } else if (coins.ethereum && ethBalance) {
        setUsdBalance(
          ethBalance.mul(new BN(coins.ethereum.market_data.current_price.usd))
        )
      }
    })()
  }, [ethBalance, coins])

  return (
    <Query<
      any,
      {
        daoId: string
        closingAt: number
      }
    >
      client={GraphqlClient.DaostackAlchemyClient}
      variables={{
        daoId: dao,
        closingAt: Math.floor(new Date().getTime() / 1000),
      }}
      query={gql`
        query Proposals($daoId: String!, $closingAt: Int!) {
          dao(id: $daoId) {
            name
            numberOfExpiredInQueueProposals
            reputationHoldersCount
            proposals(
              orderBy: closingAt
              orderDirection: desc
              where: {
                stage_in: ["ExpiredInQueue", "Executed", "Queued"]
                closingAt_lte: $closingAt
              }
            ) {
              id
              title
              proposer
            }
          }
        }
      `}
    >
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error)
          return (
            <div>
              <p>Error to load</p>
            </div>
          )
        return (
          <div>
            <CoinJumbotron
              title={data.dao.name}
              description={
                <>
                  <SharedDao
                    reputationHoldersCount={data.dao.reputationHoldersCount}
                    numberOfExpiredInQueueProposals={
                      data.dao.numberOfExpiredInQueueProposals
                    }
                    id={dao}
                  />
                  <div>
                    <div>Eth Balance</div>
                    <div>{ethBalance && ethBalance.toString()} ETH</div>
                    <div>{usdBalance && usdBalance.toString()} USD</div>
                  </div>
                </>
              }
            />
            {data.dao.proposals.map((proposal: any, key: number) => (
              <div key={`proposal-${key}`} className="p-3 my-3">
                <div className="p-2 box">
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <a
                        href={`https://alchemy.daostack.io/dao/${dao}/proposal/${proposal.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl link"
                      >
                        {proposal.title}
                      </a>

                      <div className="my-2">
                        <a
                          href={`https://alchemy.daostack.io/dao/${dao}/proposal/${proposal.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-500 flex justify-center items-center"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                          title="Link to daostack"
                        >
                          <DaostackLogo
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        </a>
                      </div>
                    </div>
                    <span
                      style={{
                        textOverflow: "ellipsis",
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      by {proposal.proposer}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }}
    </Query>
  )
}
