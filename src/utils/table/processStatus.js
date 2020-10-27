export default function processStatus(status) {
  let processedStatus = status.toLowerCase()
  processedStatus = processedStatus.replace(' ', '_')
  return processedStatus
}
