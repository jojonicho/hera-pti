export function cleanData(data) {
  return Array.isArray(data) ? cleanListInput(data) : data
}

export function changeToInput(data, isReadOnly) {
  return Array.isArray(data) ? changeToListInput(data, isReadOnly) : data
}

function cleanListInput(data) {
  return data.map(({ value }) => value).filter(value => value !== '')
}

function changeToListInput(data, isReadOnly) {
  const lst = data.map(v => ({ value: v }))
  return isReadOnly ? lst : [...lst, { value: '' }]
}
