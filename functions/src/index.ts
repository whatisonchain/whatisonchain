import * as functions from "firebase-functions"
import * as cors from "cors"
import fetch from "node-fetch"
import { urlEncode } from "./util"
import * as dotenv from "dotenv"

const corsHandler = cors({
  origin: ["https://ccinstrument.firebaseapp.com/", "http://localhost:8000/"],
})
dotenv.config()

const etherscanApiKey = process.env.ETHERSCAN_API_KEY

// Get Contract ABI
// https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken
export const getContractABI = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, () => {
    const address = request.body.address
    const encodedUrl = urlEncode({
      module: "contract",
      action: "getabi",
      address,
      apikey: etherscanApiKey,
    })
    return fetch(`https://api.etherscan.io/api?${encodedUrl}`)
      .then(res => res.json())
      .then(data => {
        response.status(200).json(JSON.stringify(data.result))
      })
      .catch(err => {
        response.status(400).json({ message: "Unable to get data" })
      })
  })
})

// https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=YourApiKeyToken
export const getGasPrice = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, () => {
    const encodedUrl = urlEncode({
      module: "proxy",
      action: "eth_gasPrice",
      apikey: etherscanApiKey,
    })
    return fetch(`https://api.etherscan.io/api?${encodedUrl}`)
      .then(res => res.json())
      .then(data => {
        response.status(200).json({ gasprice: parseInt(data.result, 16) })
      })
      .catch(err => {
        response.status(400).json({ message: "Unable to get data" })
      })
  })
})
