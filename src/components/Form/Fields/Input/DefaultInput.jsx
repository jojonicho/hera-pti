import { Input } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import FormFieldWrapper from '../FormFieldWrapper'

const DefaultInput = ({ name, isRequired, isHidden, isNoDiscussion, isHiddenLabel, ...props }) => {
  const { register, isReadOnly } = useFormContext()

  return (
    <FormFieldWrapper
      {...props}
      name={name}
      isRequired={isRequired}
      isHidden={isHidden}
      isNoDiscussion={isNoDiscussion}
      isHiddenLabel={isHiddenLabel}
    >
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
  isHidden: PropTypes.bool,
  isNoDiscussion: PropTypes.bool,
  isHiddenLabel: PropTypes.bool,
}

export default DefaultInput
