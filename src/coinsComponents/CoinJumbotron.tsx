import React from "react"

interface CoinJumbotronProps {
  title: string
  description: string | JSX.Element
}

export const CoinJumbotron: React.FC<CoinJumbotronProps> = ({
  title,
  description,
}) => {
  return (
    <div className="w-100 my-5 p-2 box">
      <p className="text-5xl">{title}</p>
      {typeof description === "string" ? (
        <p className="mt-2 text-xl">{description}</p>
      ) : (
        description
      )}
    </div>
  )
}
