export function convertDateFormat(rawDate) {
  let localeDateString = rawDate.toLocaleDateString()
  let splittedDate = localeDateString.split('/')

  let date = giveExtraLeadZero(splittedDate[1])
  let month = giveExtraLeadZero(splittedDate[0])
  let year = splittedDate[2]

  return year + '-' + month + '-' + date
}

function giveExtraLeadZero(s) {
  return s.length < 2 ? '0' + s : s
}
