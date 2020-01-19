import React from "react"
import { InfoTab } from "./Info"
import { useCoinDetailsHooks } from "../../../util/coinDetailsHooks"
import { CoinJson } from "../../../model/CoinJson"
import { CoinTab } from "../../CoinTab"
import { Calculator } from "../../CalculatorTab"
import { ProfileTab } from "./Profile"
import { ProposalsTab } from "./Proposals"
import { Link } from "gatsby"
import { DelegationTab } from "./Delegation"
import { Tab } from "../../Tab"

interface SteemPageProps {
  subRoute: string
  coinJson: CoinJson
}

const SteemPage: React.FC<SteemPageProps> = ({ subRoute, coinJson }) => {
  const { tabItem, checkRoute, tabObject } = useCoinDetailsHooks(
    coinJson,
    subRoute
  )

  const TabComponent = () => {
    let Comp: any
    let item: {
      name: string
      description: string
      route: string
    } = {} as any
    switch (subRoute) {
      case "proposals":
        Comp = () => <ProposalsTab />
        item = tabObject["proposals"]
        break
      case "account":
        Comp = () => <ProfileTab />
        item = tabObject["account"]
        break
      case "calculator":
        Comp = () => <Calculator coinId="steem" />
        item = tabObject["calculator"]
        break
      case "delegation":
        Comp = () => <DelegationTab />
        item = tabObject["delegation"]
        break
      case "info":
      default:
        item = tabObject["info"]
        Comp = () => <InfoTab />
        break
    }
    return (
      <CoinTab
        description={item.description}
        name={item.name}
        coinId={"Steem"}
        Comp={Comp}
      />
    )
  }

  return (
    <div>
      <Tab
        tabItem={tabItem}
        checkRoute={checkRoute}
        TabComponent={TabComponent}
        coinId="steem"
      />
    </div>
  )
}

export default SteemPage
