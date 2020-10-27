import { Select } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import FormFieldWrapper from '../FormFieldWrapper'

const DefaultSelect = ({ name, isRequired, isReadOnly, options, ...props }) => {
  const { register, errors } = useFormContext()

  return (
    <FormFieldWrapper {...props} errors={errors[name]} isRequired={isRequired}>
      <Select
        ref={register({ required: isRequired })}
        name={name}
        bg="form"
        rounded="md"
        height="2rem"
        placeholder=" "
        isDisabled={isReadOnly}
        _disabled={{ bg: 'form' }}
      >
        {options.map(choice => (
          <option key={`select${name}${choice.key}`} value={choice.key}>
            {choice.value}
          </option>
        ))}
      </Select>
    </FormFieldWrapper>
  )
}

DefaultSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  create: PropTypes.bool,
}

export default DefaultSelect
