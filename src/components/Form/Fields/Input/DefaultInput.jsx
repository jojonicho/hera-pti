import { Input } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import FormFieldWrapper from '../FormFieldWrapper'

const DefaultInput = ({ name, isRequired, isReadOnly, ...props }) => {
  const { register, errors } = useFormContext()

  return (
    <FormFieldWrapper {...props} errors={errors[name]} isRequired={isRequired}>
      <Input
        ref={register({ required: isRequired })}
        name={name}
        bg="form"
        rounded="md"
        height="2rem"
        isReadOnly={isReadOnly}
        _readOnly={{ bg: 'form' }}
      />
    </FormFieldWrapper>
  )
}

DefaultInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  create: PropTypes.bool,
}

export default DefaultInput
