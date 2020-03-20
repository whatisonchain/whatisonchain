const web3 = () => import("web3")

export class EthereumClient {
  client!: import("web3").default
  initialize = false

  constructor() {}

  async init() {
    this.client = new (await web3()).default(
      "https://mainnet.infura.io/v3/b18700a49f6341e4851918312140a67c"
    )
    this.initialize = true
  }

  ensLookup(username: string) {
    if (!username.endsWith(".eth")) {
      username += ".eth"
    }
    return this.client.eth.ens.getAddress(username)
  }
}
