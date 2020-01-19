import React from "react"
import SteemClient from "../../client/steem"
import SEO from "../../../shared/seo"

interface InfoTabProps {}

export const InfoTab: React.FC<InfoTabProps> = props => {
  const [steemData, setSteemData] = React.useState<any>(null)
  const [currentUri, setCurrentUri] = React.useState("")
  const client = new SteemClient()

  React.useEffect(() => {
    ;(async () => {
      await client.init()
      setSteemData(await client.getDynamicGlobalProperties())
      setCurrentUri(client.getCurrentUri())
    })()
  }, [])

  const steemDataArr = steemData
    ? ["Current API", ...Object.keys(steemData)]
    : []

  return (
    <div>
      <SEO title="Steem Info" />

      {steemData && (
        <>
          {steemDataArr.map((key, k) => {
            const value = key === "Current API" ? currentUri : steemData[key]
            return (
              <div
                className="flex flex-row items-center justify-between"
                key={k}
              >
                <h5>
                  {key
                    .split("_")
                    .map(d => d.charAt(0).toUpperCase() + d.slice(1))
                    .join(" ")}
                </h5>
                <p>{value}</p>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
