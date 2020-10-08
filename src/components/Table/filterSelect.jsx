import { Select } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { STATUS } from '../../constants/status'

const filterSelect = ({ handleChangeFilterInput }) => {
  return (
    <Select
      placeholder="All"
      w="30%"
      borderRadius="md"
      borderColor="border"
      onChange={e => handleChangeFilterInput(e.target.value)}
    >
      {STATUS.map(status => (
        <option key={status}>{status}</option>
      ))}
    </Select>
  )
}

filterSelect.propTypes = {
  handleChangeFilterInput: PropTypes.func,
}

export default filterSelect
