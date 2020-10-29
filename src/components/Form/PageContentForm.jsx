import { Stack } from '@chakra-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { FileInput, ListInput } from 'components/Form/Fields'
import { IMAGE_TYPE } from 'constants/input'

const PageContentForm = ({ create }) => (
  <Stack
    py={['2rem', create ? '10vh' : '2rem']}
    px={['1rem', '2rem']}
    align={create ? 'center' : 'flex-start'}
  >
    <Stack width={['100%', '100%', '100%', '80%']}>
      <ListInput name="flow" label="Flow" helperText="sub-flows and expectations" isRequired />
      <ListInput name="preconditions" label="Preconditions" />
      <ListInput
        name="display_details"
        label="Display Details"
        helperText="brief explanation of design"
      />
      <FileInput
        name="sketch"
        label="Page's Reference Sketch"
        helperText="if design is provided"
        accept={IMAGE_TYPE}
      />
    </Stack>
  </Stack>
)

PageContentForm.propTypes = {
  create: PropTypes.bool,
}

export default PageContentForm
