import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Card } from 'components'
import { Input, Select } from 'components/Form/Fields'
import { PROJECT_REQUEST_TYPES } from 'constants/options'

const ProjectInfoForm = ({ create, isReadOnly }) => {
  const { register, errors } = useForm()
  const options = []

  return (
    <Card title="Project Info">
      <Select
        register={register}
        name="department"
        label="Department"
        errors={errors.department}
        create={create}
        isRequired
        isReadOnly={isReadOnly}
        options={options}
      />
      <Input
        register={register}
        name="deadline"
        label="Deadline"
        errors={errors.deadline}
        create={create}
        isRequired
        isReadOnly={isReadOnly}
      />
      <Input
        register={register}
        name="figmaurl"
        label="Figma URL"
        errors={errors.figmaurl}
        helperText="or other design platforms"
        create={create}
        isReadOnly={isReadOnly}
      />
      <Input
        register={register}
        name="assetsurl"
        label="Assets URL"
        errors={errors.assetsurl}
        create={create}
        isReadOnly={isReadOnly}
      />
      <Select
        register={register}
        name="requesttype"
        label="Request Type"
        errors={errors.requesttype}
        create={create}
        isRequired
        isReadOnly={isReadOnly}
        options={PROJECT_REQUEST_TYPES}
      />
      <Input
        register={register}
        name="accessurl"
        label="Preferred Access URL"
        errors={errors.accessurl}
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
}

export default ProjectInfoForm
