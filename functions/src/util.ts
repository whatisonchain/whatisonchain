/**
 * urlEncode: Encode URL functions by passing in params
 */
export const urlEncode = (params: { [key: string]: any }) => {
  return Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    })
    .join("&")
}
