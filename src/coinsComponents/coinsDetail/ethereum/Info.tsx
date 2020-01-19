import React, { useContext } from "react"
import { CoinStoreContext } from "../../../store/CoinStore"

interface GasPrice {
  fast: number
  fastest: number
  safeLow: number
  average: number
  safeLowWait: number
  avgWait: number
  fastWait: number
  fastestWait: number
}
export const InfoTab = () => {
  const { coins, getCoinData } = useContext(CoinStoreContext)!
  const [ethData, setEthData] = React.useState<GasPrice | null>(null)
  const [gasLimit, setGasLimit] = React.useState(21000)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGasLimit(parseInt(e.target.value) || 0)
  }

  React.useEffect(() => {
    ;(async () => {
      if (!coins.ethereum) await getCoinData("ethereum")
      const response = await fetch(
        `https://ethgasstation.info/json/ethgasAPI.json`
      )
      setEthData(await response.json())
    })()
  }, [])

  return (
    <div>
      {ethData && (
        <div className="flex flex-col items-center justify-between">
          <span className="text-4xl font-bold">Gas Price</span>
          <span className="text-lg py-2 mb-2">
            Data powered by{" "}
            <a
              href="https://ethgasstation.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              ETH Gas Station
            </a>
          </span>
          <label className="text-xl">Gas Limit</label>
          <div className="flex shadow appearance-none border rounded py-2 px-3 mb-4 text-gray-700">
            <input
              type="number"
              className="w-full leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Gas Limit"
              value={gasLimit}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row flex-wrap w-full">
            <GasBox
              title="Fastest (&lt;30s)"
              wait={ethData.fastestWait}
              x10gwei={ethData.fastest}
              ethPrice={coins.ethereum.market_data.current_price.usd}
              gasLimit={gasLimit}
            />
            <GasBox
              title="Fast (&lt;2m)"
              wait={ethData.fastWait}
              x10gwei={ethData.fast}
              ethPrice={coins.ethereum.market_data.current_price.usd}
              gasLimit={gasLimit}
            />
            <GasBox
              title="Average (&lt;5m)"
              wait={ethData.avgWait}
              x10gwei={ethData.average}
              ethPrice={coins.ethereum.market_data.current_price.usd}
              gasLimit={gasLimit}
            />
            <GasBox
              title="SafeLow (&lt;2m)"
              wait={ethData.safeLowWait}
              x10gwei={ethData.safeLow}
              ethPrice={coins.ethereum.market_data.current_price.usd}
              gasLimit={gasLimit}
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface GasBoxProps {
  title: string
  wait: number
  x10gwei: number
  ethPrice: number
  gasLimit: number
}

const GasBox: React.FC<GasBoxProps> = ({
  title,
  wait,
  x10gwei,
  ethPrice,
  gasLimit,
}) => {
  const gweiPrice = ethPrice / 1000000000
  const gwei = x10gwei / 10

  return (
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
      <div className="p-2 box flex flex-col">
        <span className="text-2xl font-bold">{title}</span>
        <div className="flex flex-col mt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl">Wait Time</span>
            <span className="text-sm">{wait * 60}s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl">Gas Price</span>
            <div className="flex flex-col items-end">
              <span className="text-sm">{gwei} Gwei</span>
              <span className="text-xs">
                ${parseFloat(`${gwei * gweiPrice * gasLimit}`).toFixed(5)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
