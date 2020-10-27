import { IconButton, Input, InputGroup, InputLeftAddon, InputRightElement } from '@chakra-ui/core'
import React, { useEffect, useCallback, useRef } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import FormFieldWrapper from '../FormFieldWrapper'

const ListInput = ({ name, isRequired, isReadOnly, ...props }) => {
  const { register, control, errors } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  })
  const lastField = useRef(null)

  const appendInputField = useCallback(() => {
    lastField.current.removeEventListener('keydown', appendInputField)
    append({ value: '' })
  }, [lastField, append])

  const removeInputField = index => {
    lastField.current.removeEventListener('keydown', appendInputField)
    remove(index)
  }

  useEffect(() => {
    if (fields.length === 0) {
      append({ value: '' })
      return
    }
    isReadOnly || lastField.current.addEventListener('keydown', appendInputField)
  }, [fields, append, isReadOnly, lastField, appendInputField])

  return (
    <FormFieldWrapper {...props} errors={errors[name]} isRequired={isRequired}>
      {fields.length === 1 ? (
        <InputGroup rounded="md" key={fields[0].id}>
          <InputLeftAddon bg="formaddon" height="2rem">
            1.
          </InputLeftAddon>
          <Input
            ref={e => {
              lastField.current = e
              register(e, { required: isRequired })
            }}
            name={`${name}[0].value`}
            defaultValue={fields[0].value}
            bg="form"
            height="2rem"
            roundedLeft="0"
            isReadOnly={isReadOnly}
            _readOnly={{ bg: 'form' }}
          />
        </InputGroup>
      ) : (
        fields.map((item, index) => (
          <InputGroup rounded="md" key={item.id}>
            <InputLeftAddon bg="formaddon" height="2rem">
              {index + 1}.
            </InputLeftAddon>
            <Input
              ref={e => {
                lastField.current = e
                register(e)
              }}
              name={`${name}[${index}].value`}
              defaultValue={item.value}
              bg="form"
              height="2rem"
              roundedLeft="0"
              isReadOnly={isReadOnly}
              _readOnly={{ bg: 'form' }}
            />
            {!isReadOnly && (
              <InputRightElement height="2rem">
                <IconButton
                  bg="form"
                  icon="minus"
                  variant="ghost"
                  aria-label="Remove Input"
                  size="xs"
                  onClick={() => removeInputField(index)}
                />
              </InputRightElement>
            )}
          </InputGroup>
        ))
      )}
    </FormFieldWrapper>
  )
}

ListInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  create: PropTypes.bool,
}

export default ListInput
