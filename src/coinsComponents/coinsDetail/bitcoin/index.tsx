import React from "react"
import { StackSatsTab } from "./StackSats"
import { useCoinDetailsHooks } from "../../../util/coinDetailsHooks"
import { CoinJson } from "../../../model/CoinJson"
import { Calculator } from "../../CalculatorTab"
import { Link } from "gatsby"

interface BitcoinPageProps {
  subRoute: string
  coinJson: CoinJson
}

const BitcoinPage: React.FC<BitcoinPageProps> = ({ subRoute, coinJson }) => {
  const { tabItem, checkRoute, tabObject } = useCoinDetailsHooks(
    coinJson,
    subRoute
  )

  const renderItem = () => {
    switch (subRoute) {
      case "calculator":
        return <Calculator coinId="bitcoin" />
      case "stack-sats":
        return <StackSatsTab />
      case "info":
      default:
        return <div>Info</div>
    }
  }

  return (
    <div>
      <ul className="flex border-b">
        {tabItem.map((item, key) => (
          <li className="-mb-px mr-1" key={key}>
            <Link
              className={`bg-white inline-block py-2 px-4 font-semibold ${
                checkRoute(item.route)
                  ? "border-l border-t border-r rounded-t text-purple-700"
                  : "text-purple-500"
              }`}
              to={`/coins/bitcoin/${item.route}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {renderItem()}
    </div>
  )
}

export default BitcoinPage
