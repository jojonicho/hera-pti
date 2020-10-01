import { Stack } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { Input, ListInput } from 'components/Form/Fields'

const PageContentForm = ({ register, control, create, isReadOnly }) => (
  <Stack
    py={['2rem', create ? '10vh' : '2rem']}
    px={['1rem', '2rem']}
    align={create ? 'center' : 'flex-start'}
  >
    <Stack width={['100%', '100%', '100%', create ? '80%' : '70%']}>
      <Input
        register={register}
        name="sketch"
        label="Page's Reference Sketch"
        helperText="if design is provided"
        create={create}
        isReadOnly={isReadOnly}
      />
      <ListInput
        register={register}
        control={control}
        name="displaydetails"
        label="Display Details"
        helperText="brief explanation of design"
        create={create}
        isReadOnly={isReadOnly}
      />
      <ListInput
        register={register}
        control={control}
        name="flow"
        label="Flow"
        helperText="sub-flows and expectations"
        create={create}
        isRequired
        isReadOnly={isReadOnly}
      />
      <ListInput
        register={register}
        control={control}
        name="preconditions"
        label="Preconditions"
        create={create}
        isReadOnly={isReadOnly}
      />
    </Stack>
  </Stack>
)

PageContentForm.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  create: PropTypes.bool,
  isReadOnly: PropTypes.bool,
}

export default PageContentForm
