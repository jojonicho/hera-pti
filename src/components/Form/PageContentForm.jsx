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
      <ListInput
        name="flow"
        label="Flow"
        helperText="additional subflows, e.g. display modal on submit"
      />
      <ListInput
        name="preconditions"
        label="Preconditions"
        helperText="prerequisites before accessing this page"
      />
      <ListInput
        name="display_details"
        label="Display Details"
        helperText="additional display explanations"
      />
      <FileInput
        name="sketch"
        label="Page's Layout Sketch"
        helperText="layout sketch for reference"
        accept={IMAGE_TYPE}
      />
    </Stack>
  </Stack>
)

PageContentForm.propTypes = {
  create: PropTypes.bool,
}

export default PageContentForm
