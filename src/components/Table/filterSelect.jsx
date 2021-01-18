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
import { optionsPropTypes } from 'constants/proptypes/general'

const filterSelect = ({
  filterLabel,
  options,
  selectedFilters,
  handleChangeFiltersInput,
  isMobile,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button p="1em 2em" mr="0.5em" mb={isMobile ? '0.5em' : '0'}>
          Filter by {filterLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent w="auto">
        <Box display="flex" justifyContent="center" py="1em">
          <CheckboxGroup
            defaultValue={selectedFilters}
            onChange={values => handleChangeFiltersInput(values)}
            padding="0 1.5rem"
          >
            {options.map(option => (
              <Checkbox key={option.value} value={option.value}>
                {option.label}
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
  options: optionsPropTypes.isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChangeFiltersInput: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
}

export default filterSelect
