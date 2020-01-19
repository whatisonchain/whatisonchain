import React from "react"
import { Link } from "@reach/router"

interface TabProps {
  tabItem: {
    name: string
    route: string
    description: string
  }[]
  checkRoute: (itemHash: string) => boolean
  TabComponent: () => JSX.Element
  coinId: string
}

export const Tab: React.FC<TabProps> = ({
  checkRoute,
  tabItem,
  TabComponent,
  coinId,
}) => {
  return (
    <div>
      <ul className="flex border-b my-2 flex-wrap">
        {tabItem.map((item, key) => (
          <li className="-mb-px mr-1" key={key}>
            <Link
              className={`bg-white inline-block py-2 px-4 font-semibold ${
                checkRoute(item.route)
                  ? "border-l border-t border-r rounded-t text-purple-700"
                  : "text-purple-500"
              }`}
              to={`/coins/${coinId}/${item.route}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <TabComponent />
    </div>
  )
}
