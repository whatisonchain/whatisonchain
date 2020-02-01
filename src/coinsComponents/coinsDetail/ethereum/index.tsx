import React from "react"
import { useCoinDetailsHooks } from "../../../util/coinDetailsHooks"
import { CoinJson } from "../../../model/CoinJson"
import { Calculator } from "../../CalculatorTab"
import { Link } from "gatsby"
import { InfoTab } from "./Info"
import { CoinTab } from "../../CoinTab"
import { DaostackTab } from "./Daostack"
import { EnsTab } from "./Ens"
import { Tab } from "../../Tab"

interface EthereumPageProps {
  subRoute: string
  coinJson: CoinJson
}

const EthereumPage: React.FC<EthereumPageProps> = ({ subRoute, coinJson }) => {
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
      case "calculator":
        Comp = () => <Calculator coinId="ethereum" />
        item = tabObject["calculator"]
        break
      case "daostack":
        Comp = () => <DaostackTab />
        item = tabObject["daostack"]
        break
      case "ens":
        Comp = () => <EnsTab />
        item = tabObject["ens"]
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
        coinId={"Ethereum"}
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
        coinId="ethereum"
      />
    </div>
  )
}

export default EthereumPage
