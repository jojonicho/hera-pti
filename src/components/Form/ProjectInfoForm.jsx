import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'components'
import { Select, Input } from 'components/Form/Fields'
import { BIRDEPT_OPTIONS, PROJECT_REQUEST_TYPES } from 'constants/options'
import { retrieveOrganizationsApi } from 'services/organization'
import { Box, Spinner } from '@chakra-ui/core'
import { useToast } from '@chakra-ui/react'

const ProjectInfoForm = ({ create, isReadOnly, dept }) => {
  const [department, setDepartment] = useState('')
  const [organizationOptions, setOrganizationOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  const fetchData = useCallback(async () => {
    const [data, error] = await retrieveOrganizationsApi()
    if (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: error.statusText,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    const choice = data.map(organization => ({
      value: organization.id,
      label: organization.name,
    }))
    setOrganizationOptions(choice)
  }, [toast])

  useEffect(() => {
    setIsLoading(true)
    setDepartment(dept)
    fetchData()
    setIsLoading(false)
  }, [dept, fetchData])

  return (
    <>
      {isLoading ? (
        <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Card title="Project Info">
          <Select
            name="department"
            label="Department"
            create={create}
            isRequired
            isReadOnly={isReadOnly}
            options={BIRDEPT_OPTIONS}
            onChange={e => setDepartment(e.target.value)}
          />
          <Input
            name="other_department"
            label="Others"
            create={create}
            isRequired={department === 'other'}
            isReadOnly={isReadOnly}
            isHidden={department !== 'other'}
            isNoDiscussion
          />
          <Select
            name="receiver"
            label="Receiver"
            create={create}
            isRequired
            isReadOnly={isReadOnly}
            options={organizationOptions}
          />
          <Input name="description" label="Description" create={create} isReadOnly={isReadOnly} />
          <Input
            name="deadline"
            label="Deadline"
            helperText="YYYY-MM-DD"
            create={create}
            isRequired
            isReadOnly={isReadOnly}
          />
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
      )}
    </>
  )
}

ProjectInfoForm.propTypes = {
  create: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  dept: PropTypes.string,
}

export default ProjectInfoForm
