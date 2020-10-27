export default function generateStatusBadgeProps(status) {
  let color = status === 'draft' ? 'rejectedBadge' : 'white'
  const bgMap = {
    rejected: 'rejectedBadge',
    in_review: 'inReviewBadge',
    accepted: 'acceptedBadge',
    ongoing: 'secondary',
    completed: 'completedBadge',
    submitted: 'submittedBadge',
  }

  return { bg: bgMap[status], color: color, status: status }
}
