const web3 = require("web3")

export class EthereumClient {
  client!: import("web3").default
  initialize = false
  constructor() {}

  async init() {
    this.client = new web3(
      "https://mainnet.infura.io/v3/b18700a49f6341e4851918312140a67c"
    )
    this.initialize = true
  }

  getGlobal() {
    return this.client
  }
}
