import { Input } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import FormFieldWrapper from '../FormFieldWrapper'

const DefaultInput = ({ name, isRequired, ...props }) => {
  const { register, isReadOnly } = useFormContext()

  return (
    <FormFieldWrapper {...props} name={name} isRequired={isRequired}>
      <Input
        ref={register({ required: isRequired })}
        name={name}
        bg="form"
        rounded="md"
        height="2rem"
        isDisabled={isReadOnly}
        _disabled={{ bg: 'form' }}
      />
    </FormFieldWrapper>
  )
}

DefaultInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
}

export default DefaultInput
