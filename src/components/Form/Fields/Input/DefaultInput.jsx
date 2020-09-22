import { Flex, FormControl, FormHelperText, FormLabel, Input, Stack } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const DefaultInput = ({
  register,
  name,
  errors,
  label,
  helperText,
  isRequired,
  isReadOnly,
  create,
}) => (
  <FormControl isRequired={isRequired} isReadOnly={isReadOnly} isInvalid={errors}>
    <Flex direction="row" justify="space-between" width="100%" mb={['1rem', '1.5rem']}>
      <Flex direction={['column', 'row']} align={['flex-start', 'center']} width="100%">
        <Stack width={['100%', '11rem']} pr={4}>
          <FormLabel textAlign={['left', 'right']} p={0} fontSize="sm">
            {label}
          </FormLabel>
          {helperText && (
            <FormHelperText textAlign={['left', 'right']} mt="-0.4rem" fontSize="xs">
              {helperText}
            </FormHelperText>
          )}
        </Stack>
        <Input
          ref={register}
          name={name}
          bg="form"
          rounded="md"
          width={['100%', create ? 'calc(100% - 11rem)' : 'calc(85% - 11rem)']}
          height="2rem"
          _readOnly={{ bg: 'form' }}
        />
      </Flex>
      {/* {create || <insert element discussion joni>} */}
    </Flex>
  </FormControl>
)

DefaultInput.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  create: PropTypes.bool,
}

export default DefaultInput
