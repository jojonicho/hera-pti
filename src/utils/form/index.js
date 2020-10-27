export function cleanListInput(data) {
  return data.map(({ value }) => value).filter(value => value !== '')
}

export function changeToListInput(data, isReadOnly) {
  const lst = data.map(v => ({ value: v }))
  return isReadOnly ? lst : [...lst, { value: '' }]
}
