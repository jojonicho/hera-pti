export const smoothScrollToRef = targetRef => {
  if (targetRef.current) {
    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }
}
