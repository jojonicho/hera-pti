import React from 'react'
import PropTypes from 'prop-types'

const TripleDot = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className="bi bi-three-dots-vertical"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
      />
    </svg>
  )
}

TripleDot.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
}

export default TripleDot
