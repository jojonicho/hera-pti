import { fieldNames } from 'constants/fieldNames'

const convertFieldName = name => {
  return fieldNames[name] || name
}

export default convertFieldName
