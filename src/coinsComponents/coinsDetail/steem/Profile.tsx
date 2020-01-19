import React from "react"
import SteemClient from "../../client/steem"
import SEO from "../../../shared/seo"
import { debounce } from "../../../util/debounce"

interface ProfileTabProps {}

export const ProfileTab: React.FC<ProfileTabProps> = props => {
  const [steemData, setSteemData] = React.useState<any>(null)
  const client = new SteemClient()

  React.useEffect(() => {
    ;(async () => {
      await client.init()
    })()
  }, [])

  const getProfile: any = debounce(async (account: string) => {
    if (client.initialize === false) {
      await client.init()
    }
    setSteemData(await client.getAccount(account))
  }, 200)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value
    getProfile(username)
  }

  const renderProfile = (data: any) => {
    let jsonMetadata
    try {
      jsonMetadata = JSON.parse(data.json_metadata)
    } catch (err) {
      jsonMetadata = null
    }

    const profile = jsonMetadata && jsonMetadata.profile
    const backgroundStyle =
      profile && profile.cover_image
        ? {
            backgroundImage: `url(https://steemitimages.com/2048x512/${profile.cover_image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }
        : { backgroundColor: "#dcdcdc" }
    return (
      <>
        <h4>Profile</h4>
        <div
          className="flex flex-col items-center px-4"
          style={backgroundStyle}
        >
          <img
            className="mt-3"
            src={`https://steemitimages.com/u/${data.name}/avatar`}
          />
          <h2 className="text-white" style={{ textShadow: "1px 1px #333" }}>
            @{data.name}
          </h2>
        </div>
        <h4>Raw Data</h4>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </>
    )
  }

  return (
    <div>
      <div className="my-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <div className="flex shadow appearance-none border rounded py-2 px-3 text-gray-700">
          <span className="mr-2">@</span>
          <input
            onChange={handleChange}
            className="w-full leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        {steemData && steemData.length > 0 ? (
          renderProfile(steemData[0])
        ) : (
          <div className="my-2 p-2 bg-gray-300 ">
            Please enter username to get started
          </div>
        )}
      </div>
    </div>
  )
}
