import { Flex, FormControl, FormLabel, Select, Stack } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const DefaultSelect = ({
  register,
  name,
  errors,
  label,
  isRequired,
  isReadOnly,
  create,
  options,
}) => (
  <FormControl isRequired={isRequired} isInvalid={errors}>
    <Flex direction="row" justify="space-between" width="100%" mb="1.5rem">
      <Flex direction={['column', 'row']} align={['flex-start', 'center']} width="100%">
        <Stack width={['100%', '11rem']} pr={4} mb={[1, 0]}>
          <FormLabel textAlign={['left', 'right']} p={0} fontSize="sm">
            {label}
          </FormLabel>
        </Stack>
        <Select
          ref={register}
          name={name}
          bg="form"
          rounded="md"
          width={['100%', create ? 'calc(100% - 11rem)' : 'calc(85% - 11rem)']}
          height="2rem"
          placeholder=" "
          isDisabled={isReadOnly}
          _disabled={{ bg: 'form' }}
        >
          {options.map(choice => (
            <option key={choice.key} value={choice.value}>
              {choice.value}
            </option>
          ))}
        </Select>
      </Flex>
      {/* {create || <insert element discussion joni>} */}
    </Flex>
  </FormControl>
)

DefaultSelect.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
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
