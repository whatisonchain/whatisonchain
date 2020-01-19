import React from "react"
import { useCoinDetailsHooks } from "../../../util/coinDetailsHooks"
import { CoinJson } from "../../../model/CoinJson"
import { CoinTab } from "../../CoinTab"
import { Calculator } from "../../CalculatorTab"
import { Tab } from "../../Tab"

interface SteemDollarPageProps {
  subRoute: string
  coinJson: CoinJson
}

const DaiPage: React.FC<SteemDollarPageProps> = ({ subRoute, coinJson }) => {
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
      default:
        Comp = () => <Calculator coinId="dai" />
        item = tabObject["calculator"]
        break
    }
    return (
      <CoinTab
        description={item.description}
        name={item.name}
        coinId={"Dai"}
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
        coinId="dai"
      />
    </div>
  )
}

export default DaiPage
