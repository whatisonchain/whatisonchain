export interface CoinJson {
  name: string
  symbol: string
  coin_id: string
  image: string
  tabs: {
    name: string
    route: string
    description: string
  }[]
}
