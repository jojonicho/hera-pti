import { Flex, FormControl, FormHelperText, FormLabel, Stack } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

import { useWindowSize } from 'hooks'
import { MOBILE_MAX_WIDTH } from 'constants/size'
import { DiscussionCreate, DiscussionList } from 'components/Discussion'

const FormFieldWrapper = ({ children, label, name, helperText, isRequired }) => {
  const { width } = useWindowSize()
  const { create, isHistory, errors, discussions, targetPageId, targetProjectId } = useFormContext()

  let discussion = <Stack size={['1.2rem', '1.5rem']} />
  if (discussions[name]) {
    discussion = (
      <DiscussionList
        isActive={!isHistory}
        discussions={discussions[name]}
        label={label}
        targetFieldName={name}
        targetPageId={targetPageId}
        targetProjectId={targetProjectId}
      />
    )
  } else if (!isHistory) {
    discussion = (
      <DiscussionCreate
        fieldName={name}
        targetPageId={targetPageId}
        targetProjectId={targetProjectId}
      />
    )
  }

  return (
    <FormControl isRequired={isRequired} isInvalid={errors[name] ? true : false}>
      <Flex direction="row" justify="space-between" width="100%" mb="1.5rem">
        <Flex direction={['column', 'row']} align="flex-start" width="100%">
          <Flex direction="row" justify="space-between" width={['100%', 'auto']}>
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
            {width < MOBILE_MAX_WIDTH && !create && discussion}
          </Flex>
          <Stack width={['100%', create ? 'calc(100% - 11rem)' : 'calc(100% - 12rem)']}>
            {children}
          </Stack>
        </Flex>
        {width >= MOBILE_MAX_WIDTH && !create && discussion}
      </Flex>
    </FormControl>
  )
}

FormFieldWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
}

export default FormFieldWrapper
