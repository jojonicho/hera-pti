import { Select } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

import { optionsPropTypes } from 'constants/proptypes/general'
import FormFieldWrapper from '../FormFieldWrapper'

const DefaultSelect = ({ name, isRequired, options, onChange, ...props }) => {
  const { register, isReadOnly } = useFormContext()
  const noAvailableOptions = options.length === 0

  return (
    <FormFieldWrapper {...props} name={name} isRequired={isRequired}>
      <Select
        ref={register({ required: isRequired })}
        name={name}
        bg="form"
        rounded="md"
        height="2rem"
        placeholder={noAvailableOptions ? 'No options available.' : ''}
        isDisabled={isReadOnly || noAvailableOptions}
        _disabled={{ bg: 'form' }}
        onChange={onChange}
      >
        {options.map((option, id) => (
          <option key={`${id}${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormFieldWrapper>
  )
}

DefaultSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: optionsPropTypes.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
}

export default DefaultSelect
