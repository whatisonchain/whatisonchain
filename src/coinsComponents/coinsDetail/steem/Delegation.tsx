import React from "react"

export const DelegationTab = () => {
  const [data, setData] = React.useState({
    username: "",
    amount: "",
  })

  React.useEffect(() => {
    if (window.steem_keychain) {
      // Steem Keychain extension installed...
    } else {
      // Steem Keychain extension not installed...
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    setData({
      ...data,
      [name]: value,
    } as any)
  }

  return (
    <>
      <form>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Delegatee
        </label>
        <div className="flex shadow appearance-none border rounded py-2 px-3 text-gray-700">
          <span className="mr-2">@</span>
          <input
            onChange={handleChange}
            className="w-full leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amount
        </label>
        <div className="flex shadow appearance-none border rounded py-2 px-3 text-gray-700">
          <input
            onChange={handleChange}
            className="w-full leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            name="amount"
            type="number"
            placeholder="Amount of Steem Power"
          />
          <span className="ml-2">SP</span>
        </div>
        <div className="my-4">
          <a
            className="btn btn-blue"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://steemconnect.com/sign/delegateVestingShares?delegatee=${data.username}&vesting_shares=${data.amount}%20SP
            `}
          >
            SteemConnect
          </a>
        </div>
      </form>
    </>
  )
}
