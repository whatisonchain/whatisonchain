import React from "react"
import { CoinsJson } from "../../../types/graphql-types"
import { Link, navigate } from "gatsby"

interface CoinCardProps
  extends Pick<CoinsJson, "name" | "symbol" | "coin_id" | "image"> {}

const CoinCard: React.FC<CoinCardProps> = ({
  image,
  symbol,
  coin_id,
  name,
}) => {
  const handleLinkClick = () => {
    navigate(`/coins/${coin_id!}`)
  }

  return (
    <div
      className="max-w-sm rounded overflow-hidden border border-gray-400 hover:shadow-lg p-2 cursor-pointer"
      onClick={handleLinkClick}
    >
      <div className="flex justify-center">
        <img
          style={{ width: "80px", height: "80px" }}
          className="w-full"
          src={image!}
          alt={coin_id!}
        />
      </div>

      <div className="px-2 py-1 flex justify-center">
        <Link to={`/coins/${coin_id!}`} className="font-bold text-xl mb-2">
          {name} ({symbol?.toUpperCase()})
        </Link>
        <p className="text-gray-700 text-base"></p>
      </div>
    </div>
  )
}

export default CoinCard
