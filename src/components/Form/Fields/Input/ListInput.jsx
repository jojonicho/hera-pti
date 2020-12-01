import { IconButton, Input, InputGroup, InputLeftAddon, InputRightElement } from '@chakra-ui/core'
import React, { useEffect, useCallback, useRef } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import FormFieldWrapper from '../FormFieldWrapper'

const ListInput = ({ name, isRequired, ...props }) => {
  const { register, control, isReadOnly } = useFormContext()
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
    lastField.current.addEventListener('keydown', appendInputField)
    isReadOnly && lastField.current.removeEventListener('keydown', appendInputField)
  }, [fields, append, isReadOnly, lastField, appendInputField])

  return (
    <FormFieldWrapper {...props} name={name} isRequired={isRequired}>
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
            isDisabled={isReadOnly}
            _disabled={{ bg: 'form' }}
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
              isDisabled={isReadOnly}
              _disabled={{ bg: 'form' }}
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
  errors: PropTypes.array,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
}

export default ListInput
