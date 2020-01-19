import React from "react"

export const InfoTab = () => {
  const [ethData, setEthData] = React.useState<any>(null)

  React.useEffect(() => {
    ;(async () => {
      const isDev = process.env.NODE_ENV === "development"
      const url = isDev
        ? "https://whatisonchain.com/api/getGasPrice"
        : "/api/getGasPrice"
      const response = await fetch(url)
      setEthData(await response.json())
    })()
  })

  return (
    <div>
      {ethData && (
        <div className="flex flex-row items-center justify-between">
          <h5>Gas Price</h5>
          <p>{ethData.gasprice}</p>
        </div>
      )}
    </div>
  )
}
