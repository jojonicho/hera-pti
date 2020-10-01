import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from '@chakra-ui/core'
import React, { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import PropTypes from 'prop-types'

const ListInput = ({
  register,
  control,
  name,
  label,
  helperText,
  isRequired,
  isReadOnly,
  create,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  })

  const lastField = () => document.getElementById(`${name}${fields.length}`)

  const appendInputFields = () => {
    lastField().removeEventListener('keydown', appendInputFields)
    append({ value: '' })
  }

  const removeInputField = index => {
    lastField().removeEventListener('keydown', appendInputFields)
    remove(index)
  }

  useEffect(() => {
    if (fields.length === 0) {
      append({ value: '' })
      return
    }
    isReadOnly || lastField().addEventListener('keydown', appendInputFields)
  }, [fields])

  return (
    <FormControl isRequired={isRequired} isReadOnly={isReadOnly}>
      <Flex direction="row" justify="space-between" width="100%" mb="1.5rem">
        <Flex direction={['column', 'row']} align="flex-start" width="100%">
          <Stack width={['100%', '11rem']} pr={4} mt={helperText ? '0' : '0.4rem'} mb={[1, 0]}>
            <FormLabel textAlign={['left', 'right']} p={0} fontSize="sm">
              {label}
            </FormLabel>
            {helperText && (
              <FormHelperText textAlign={['left', 'right']} mt="-0.4rem" fontSize="xs">
                {helperText}
              </FormHelperText>
            )}
          </Stack>
          <Stack width={['100%', create ? 'calc(100% - 11rem)' : 'calc(85% - 11rem)']}>
            {fields.length === 1 ? (
              <InputGroup rounded="md" key={fields[0].id}>
                <InputLeftAddon bg="formaddon" height="2rem">
                  1.
                </InputLeftAddon>
                <Input
                  ref={register()}
                  name={`${name}[0].value`}
                  id={`${name}1`}
                  bg="form"
                  height="2rem"
                  roundedLeft="0"
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
                    ref={register()}
                    name={`${name}[${index}].value`}
                    id={`${name}${index + 1}`}
                    bg="form"
                    height="2rem"
                    roundedLeft="0"
                    _readOnly={{ bg: 'form' }}
                  />
                  {isReadOnly || (
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
          </Stack>
        </Flex>
        {/* {create || <insert element discussion joni>} */}
      </Flex>
    </FormControl>
  )
}

ListInput.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  create: PropTypes.bool,
}

export default ListInput
