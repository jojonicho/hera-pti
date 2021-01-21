import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '@chakra-ui/core'

import { optionsPropTypes } from 'constants/proptypes/general'

export const Dropdown = ({ options, setOption, defaultValue, width, ...rest }) => (
  <Select
    width={width || '100%'}
    variant="unstyled"
    defaultValue={defaultValue}
    onChange={e => setOption(e.target.value)}
    {...rest}
  >
    {options.map((option, id) => (
      <option key={id} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
)

Dropdown.propTypes = {
  options: optionsPropTypes.isRequired,
  setOption: PropTypes.func.isRequired,
  width: PropTypes.string,
  defaultValue: PropTypes.string,
}
