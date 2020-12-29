import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { STATUS } from '../../constants/status'

const filterSelect = ({ filters, handleChangeFiltersInput }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button style={{ padding: '1em 2em' }}>Filter by Status</Button>
      </PopoverTrigger>
      <PopoverContent w="10em">
        <Box display="flex" justifyContent="center" py="1em">
          <CheckboxGroup
            defaultValue={filters}
            onChange={values => handleChangeFiltersInput(values)}
          >
            {STATUS.map(status => (
              <Checkbox key={status} value={status}>
                {status}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Box>
      </PopoverContent>
    </Popover>
  )
}

filterSelect.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChangeFiltersInput: PropTypes.func.isRequired,
}

export default filterSelect
