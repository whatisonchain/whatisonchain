import React, { useReducer } from "react"
import { EthereumClient } from "../../../client/ethereum"
import { DaiConfig } from "./dai"

export const InfoTab = () => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      default:
        return state
    }
  }, {})

  React.useEffect(() => {
    ;(async () => {
      const eth = new EthereumClient()
      await eth.init()
      const contract = new eth.client.eth.Contract(
        DaiConfig.contractAbi,
        DaiConfig.address
      )
      const [totalSupply] = await Promise.all([
        contract.methods.totalSupply().call(),
      ])
    })()
  }, [])

  return <div>Info</div>
}
