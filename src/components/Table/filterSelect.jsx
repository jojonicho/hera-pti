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

const filterSelect = ({ filterLabel, options, selectedFilters, handleChangeFiltersInput }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button style={{ padding: '1em 2em' }}>Filter by {filterLabel}</Button>
      </PopoverTrigger>
      <PopoverContent w="10em">
        <Box display="flex" justifyContent="center" py="1em">
          <CheckboxGroup
            defaultValue={selectedFilters}
            onChange={values => handleChangeFiltersInput(values)}
          >
            {options.map(option => (
              <Checkbox key={option} value={option}>
                {option}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Box>
      </PopoverContent>
    </Popover>
  )
}

filterSelect.propTypes = {
  filterLabel: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChangeFiltersInput: PropTypes.func.isRequired,
}

export default filterSelect
