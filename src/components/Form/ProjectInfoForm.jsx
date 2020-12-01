import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import { Select, Input } from 'components/Form/Fields'
import { BIRDEPT_OPTIONS, PROJECT_REQUEST_TYPES } from 'constants/options'

const ProjectInfoForm = ({ create, isReadOnly }) => {
  return (
    <Card title="Project Info">
      <Select
        name="department"
        label="Department"
        create={create}
        isRequired
        isReadOnly={isReadOnly}
        options={BIRDEPT_OPTIONS}
      />
      <Input name="description" label="Description" create={create} isReadOnly={isReadOnly} />
      <Input name="deadline" label="Deadline" create={create} isRequired isReadOnly={isReadOnly} />
      <Input
        name="prototype_url"
        label="Prototype URL"
        helperText="Figma or other design platforms"
        create={create}
        isReadOnly={isReadOnly}
      />
      <Input name="assets_url" label="Assets URL" create={create} isReadOnly={isReadOnly} />
      <Select
        name="request_type"
        label="Request Type"
        create={create}
        isRequired
        isReadOnly={isReadOnly}
        options={PROJECT_REQUEST_TYPES}
      />
      <Input
        name="access_url"
        label="Preferred Access URL"
        helperText="e.g. bem.cs.ui.ac.id/reqgath"
        create={create}
        isRequired
        isReadOnly={isReadOnly}
      />
    </Card>
  )
}

ProjectInfoForm.propTypes = {
  create: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequiredActive: PropTypes.bool,
}

export default ProjectInfoForm
