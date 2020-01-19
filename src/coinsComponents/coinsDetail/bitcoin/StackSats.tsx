import React from "react"
import { loadScript } from "../../../util/loadScript"

export const StackSatsTab = () => {
  React.useEffect(() => {
    loadScript(
      "https://widgets.coingecko.com/coingecko-stack-sats-widget.js",
      () => {}
    )
  }, [])

  return <coingecko-stack-sats-widget />
}
