import { dayDateOptions, EN_US, dateOptions, timeOptions } from './constants'

export const toDayDateString = date => {
  return date.toLocaleDateString(EN_US, dayDateOptions)
}

export const toDateString = date => {
  return date.toLocaleDateString(EN_US, dateOptions)
}

export const toTimeString = date => {
  return date.toLocaleTimeString([], timeOptions)
}
