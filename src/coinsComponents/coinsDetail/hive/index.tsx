import React from "react"
import { useCoinDetailsHooks } from "../../../util/coinDetailsHooks"
import { CoinJson } from "../../../model/CoinJson"
import { CoinTab } from "../../CoinTab"
import { Calculator } from "../../CalculatorTab"
import { Link } from "gatsby"
import { Tab } from "../../Tab"

interface HivePageProps {
  subRoute: string
  coinJson: CoinJson
}

const HivePage: React.FC<HivePageProps> = ({ subRoute, coinJson }) => {
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
        Comp = () => <Calculator coinId="hive" />
        item = tabObject["calculator"]
        break
    }
    return (
      <CoinTab
        description={item.description}
        name={item.name}
        coinId={"hive"}
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
        coinId="hive"
      />
    </div>
  )
}

export default HivePage
