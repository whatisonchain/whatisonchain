export const numberConverter = (labelValue: number) => {
  // Nine Zeroes for Billions
  return Math.abs(labelValue) >= 1.0e9
    ? (labelValue / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(labelValue) >= 1.0e6
    ? (labelValue / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(labelValue) >= 1.0e3
    ? (labelValue / 1.0e3).toFixed(2) + "K"
    : labelValue.toFixed(2)
}
