import { Flex, FormControl, FormHelperText, FormLabel, Stack } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

import { useWindowSize } from 'hooks'
import { DiscussionCreate, DiscussionList } from 'components/Discussion'

const FormFieldWrapper = ({
  children,
  label,
  name,
  helperText,
  isRequired,
  isHidden,
  isNoDiscussion,
  isHiddenLabel,
}) => {
  const { isMobile } = useWindowSize()
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
  } else if (!isHistory && !isNoDiscussion) {
    discussion = (
      <DiscussionCreate
        fieldName={name}
        targetPageId={targetPageId}
        targetProjectId={targetProjectId}
      />
    )
  }

  const fieldDescriptor = (
    <>
      <FormLabel textAlign={['left', 'right']} p={0} fontSize="sm">
        {label}
      </FormLabel>
      <Stack mt="0.4rem" mr={isRequired ? '10px' : '0'}>
        {helperText && (
          <FormHelperText textAlign={['left', 'right']} mt="-0.4rem" fontSize="xs">
            {helperText}
          </FormHelperText>
        )}
      </Stack>
    </>
  )

  return (
    <FormControl isRequired={isRequired} isInvalid={errors[name] ? true : false} hidden={isHidden}>
      <Flex direction="row" justify="space-between" width="100%" mb="1.5rem">
        <Flex direction={['column', 'row']} align="flex-start" width="100%">
          <Flex direction="row" justify="space-between" width={['100%', 'auto']}>
            <Stack width={['100%', '11rem']} pr={4} mt={helperText ? '0' : '0.4rem'} mb={[1, 0]}>
              {!isHiddenLabel && fieldDescriptor}
            </Stack>
            {isMobile && !create && discussion}
          </Flex>
          <Stack width={['100%', create ? 'calc(100% - 11rem)' : 'calc(100% - 12rem)']}>
            {children}
          </Stack>
        </Flex>
        {!isMobile && !create && discussion}
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
  isHidden: PropTypes.bool,
  isNoDiscussion: PropTypes.bool,
  isHiddenLabel: PropTypes.bool,
}

export default FormFieldWrapper
