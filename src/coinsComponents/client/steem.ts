const Steem = () => import("steem")

export default class SteemClient {
  client: any
  initialize = false

  constructor() {}

  async init() {
    if (!this.initialize) {
      this.client = (await Steem()).default
      this.initialize = true
    }
  }

  getCurrentUri() {
    if (this.initialize === false) return ""
    return this.client.config.uri
  }

  private async getApi(
    method: string,
    params: any[] | null = null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const endPromise = (err: any, result: any) => {
        if (err) reject(err)
        resolve(result)
      }
      if (params) {
        this.client.api[method](...params, endPromise)
      } else {
        this.client.api[method](endPromise)
      }
    })
  }

  async getDynamicGlobalProperties() {
    return this.getApi("getDynamicGlobalProperties")
  }

  async getAccount(account: string) {
    return this.getApi("getAccounts", [[account]])
  }

  async getListProposal() {
    return this.getApi("listProposals", [
      [],
      100,
      "by_total_votes",
      "ascending",
      "all",
    ])
  }
}
