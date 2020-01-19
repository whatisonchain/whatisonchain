import { CoinJson } from "../model/CoinJson"

export const useCoinDetailsHooks = (coinJson: CoinJson, route: string) => {
  const tabItem = coinJson?.tabs || []
  const tabObject: {
    [item: string]: { name: string; route: string; description: string }
  } = {}
  tabItem.forEach(item => {
    tabObject[item.route] = item
  })
  const checkRoute = (itemHash: string) => {
    if (
      itemHash === tabItem[0].route &&
      tabItem.map(d => d.route).indexOf(route) === -1
    ) {
      return true
    }
    return itemHash === route
  }

  return {
    tabItem,
    checkRoute,
    tabObject,
  }
}
