export default function generateRequestTypeFormat(requestType) {
  switch (requestType) {
    case 'new_project':
      return '[NEW]'
    case 'bug_fix':
      return '[FIX]'
    case 'improvement':
      return '[IMPR]'
    case 'chores':
      return '[CHR]'
    default:
      return requestType
  }
}
