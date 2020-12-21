export const getColorFromNumber = number => {
  return number === 0
    ? 'gray'
    : number < 4
    ? 'green'
    : number < 7
    ? 'blue'
    : number < 11
    ? 'purple'
    : 'red'
}
