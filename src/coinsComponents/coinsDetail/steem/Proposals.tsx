import React, { useContext } from "react"
import SteemClient from "../../client/steem"
import { CoinStoreContext, CoinStoreModel } from "../../../store/CoinStore"
import { numberConverter } from "../../../util/numberConverter"

const SBD_SYMBOL = "steem-dollars"

export const ProposalsTab = () => {
  const [proposalsData, setProposalsData] = React.useState<ProposalItem[]>([])
  const client = new SteemClient()
  const { coins, getCoinData } = useContext(CoinStoreContext)!

  React.useEffect(() => {
    ;(async () => {
      await client.init()
      const proposal = await client.getListProposal()
      await getCoinData(SBD_SYMBOL)
      setProposalsData(proposal.reverse())
    })()
  }, [])

  return (
    <div className="my-5">
      {proposalsData.map(proposal => (
        <ProposalItem coins={coins} key={proposal.id} {...proposal} />
      ))}
    </div>
  )
}

interface ProposalItem {
  coins: CoinStoreModel["coins"]

  id: number
  proposal_id: number
  creator: string
  receiver: string
  start_date: string
  end_date: string
  daily_pay: string
  subject: string
  permlink: string
  total_votes: string
}
const ProposalItem: React.FC<ProposalItem> = ({
  subject,
  daily_pay,
  coins,
  creator,
  permlink,
  receiver,
}) => {
  const [amount] = daily_pay.split(" ")
  const sbdPrice = coins[SBD_SYMBOL].market_data.current_price.usd
  const amountInUsd = numberConverter(parseFloat(amount) * sbdPrice)
  const amountInSbd = numberConverter(parseFloat(amount))
  const sameReceiver = receiver === creator

  return (
    <div className="flex flex-col my-2 py-2 px-4 bg-purple-100">
      <a
        className="link text-2xl"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://steemit.com/@${creator}/${permlink}`}
      >
        {subject}
      </a>
      <div className="flex flex-row items-center">
        <img
          style={{ width: "30px", height: "30px", borderRadius: "20px" }}
          src={`https://steemitimages.com/u/${creator}/avatar`}
        />
        <div className="text-base ml-2 my-2">
          <span>by </span>
          <a
            className="link"
            href={`https://steemit.com/@${creator}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{creator}
          </a>
          {!sameReceiver && (
            <>
              <span> for </span>{" "}
              <a
                className="link"
                href={`https://steemit.com/@${receiver}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{receiver}
              </a>
            </>
          )}
        </div>
      </div>
      <span className="text-xs">
        {amountInSbd} SBD (${amountInUsd}USD)
      </span>
    </div>
  )
}
