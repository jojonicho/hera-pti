import { Stack } from '@chakra-ui/core'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

import { Input, ListInput, Select } from 'components/Form/Fields'
import { PRIORITY_CHOICES } from 'constants/options'
import { optionsPropTypes } from 'constants/proptypes/general'

const PageInfoForm = ({ create, parentPage, parentPageOptions }) => {
  const { setValue } = useFormContext()

  useEffect(() => {
    setValue('parent', parentPage)
  }, [parentPageOptions, parentPage, setValue])

  return (
    <Stack
      py={['2rem', create ? '10vh' : '2rem']}
      px={['1rem', '2rem']}
      align={create ? 'center' : 'flex-start'}
    >
      <Stack width={['100%', '100%', '100%', '80%']}>
        <Select
          name="parent"
          label="Parent Page"
          helperText="another page from which this page will be accessed"
          options={parentPageOptions}
        />
        <Input name="page_url" label="Page URL" helperText="e.g. my-project/my-page/" isRequired />
        <Select
          name="priority"
          label="Page Priority"
          helperText="level of importance"
          isRequired
          options={PRIORITY_CHOICES}
        />
        <ListInput
          name="access_details"
          label="Access Details"
          helperText="authorization criteria"
          isRequired
        />
      </Stack>
    </Stack>
  )
}

PageInfoForm.propTypes = {
  create: PropTypes.bool,
  parentPageOptions: optionsPropTypes.isRequired,
  parentPage: PropTypes.string,
}

export default PageInfoForm
