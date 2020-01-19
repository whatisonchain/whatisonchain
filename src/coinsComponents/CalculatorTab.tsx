import React from "react"
import { loadScript } from "../util/loadScript"

interface CalculatorProps {
  coinId: string
}

export const Calculator: React.FC<CalculatorProps> = ({ coinId }) => {
  React.useEffect(() => {
    loadScript(
      "https://widgets.coingecko.com/coingecko-coin-converter-widget.js",
      () => {}
    )
  }, [])

  return (
    <div className="my-5">
      <coingecko-coin-converter-widget
        coin-id={coinId}
        currency="usd"
        background-color="#ffffff"
        font-color="#4c4c4c"
        locale="en"
      />
    </div>
  )
}
