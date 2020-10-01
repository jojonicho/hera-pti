import { Stack } from '@chakra-ui/core'

import React from 'react'
import PropTypes from 'prop-types'
import { Input, ListInput, Select } from 'components/Form/Fields'

const PageInfoForm = ({ register, control, errors, create, isReadOnly }) => {
  const options = []

  return (
    <Stack
      py={['2rem', create ? '4rem' : '2rem']}
      px={['1rem', '2rem']}
      align={create ? 'center' : 'flex-start'}
    >
      <Stack width={['100%', '100%', '100%', create ? '80%' : '70%']}>
        <Select
          register={register}
          name="parent"
          label="Parent Page"
          errors={errors.parent}
          create={create}
          isRequired
          isReadOnly={isReadOnly}
          options={options}
        />
        <Input
          register={register}
          name="pageurl"
          label="Page URL"
          errors={errors.pageurl}
          create={create}
          isRequired
          isReadOnly={isReadOnly}
        />
        <ListInput
          register={register}
          control={control}
          name="accessdetails"
          label="Access Details"
          create={create}
          isRequired
          isReadOnly={isReadOnly}
        />
        <Select
          register={register}
          name="pagepriority"
          label="Page Priority"
          errors={errors.pagepriority}
          create={create}
          isRequired
          isReadOnly={isReadOnly}
          options={options}
        />
      </Stack>
    </Stack>
  )
}

PageInfoForm.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
  create: PropTypes.bool,
  isReadOnly: PropTypes.bool,
}

export default PageInfoForm
