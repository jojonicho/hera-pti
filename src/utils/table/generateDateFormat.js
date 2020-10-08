export function generateDateFormat1(inputDate) {
  const date = new Date(inputDate)
  const month = date.toString().slice(4, 8)
  const time = date.toString().slice(16, 21)
  const dateString = `${date.getDate()} ${month} ${date.getFullYear()}, ${time}`
  return dateString
}

export function generateDateFormat2(inputDate) {
  const date = new Date(inputDate)
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
  const dateString = `${day}/${month}/${date.getFullYear()}`
  return dateString
}
