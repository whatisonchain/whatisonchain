import React from "react"
import { EthereumClient } from "../../client/ethereum"
import { debounce } from "../../../util/debounce"

export const EnsTab = () => {
  const ethclient = new EthereumClient()
  const [ethData, setEthData] = React.useState<{
    address: string
    username: string
  } | null>(null)

  React.useEffect(() => {
    ;(async () => {
      await ethclient.init()
    })()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    getProfile(val)
  }

  const getProfile: any = debounce(async (username: string) => {
    if (ethclient.initialize === false) {
      await ethclient.init()
    }
    const address = await ethclient.ensLookup(username)
    setEthData({ username, address })
  }, 200)

  return (
    <div>
      <div className="my-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ENS Username (with or without .eth)
        </label>
        <div className="flex shadow appearance-none border rounded py-2 px-3 text-gray-700">
          <input
            type="string"
            className="w-full leading-tight focus:outline-none focus:shadow-outline"
            placeholder="ethkl.eth / ethkl"
            onChange={handleInputChange}
          />
        </div>
      </div>
      {ethData && (
        <>
          <h4>Profile</h4>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span>Username</span>
              <span>{ethData.username}</span>
            </div>
            <div className="flex justify-between">
              <span>Address</span>
              <a
                className="link"
                href={`https://etherscan.io/address/${ethData.address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ethData.address}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
