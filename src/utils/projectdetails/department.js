export const hasPrefix = (prefix, str) => {
  return str.substring(0, prefix.length) === prefix
}

export const trimPrefix = (prefix, str) => {
  if (hasPrefix(prefix, str)) {
    return str.substring(prefix.length).trim()
  }
  return str
}
