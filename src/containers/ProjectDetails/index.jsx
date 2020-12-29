import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  Flex,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/core'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { ProjectInfoForm, Card, Breadcrumb } from 'components'
import { useForm, FormProvider } from 'react-hook-form'
import TreeContainer from 'components/TreeContainer'

import { useParams, useHistory, Link } from 'react-router-dom'
import { PROJECT_BY_ID_URL, PROJECT_HISTORY_BY_ID_URL } from 'constants/urls'
import { postProjectById, putProjectStatus } from 'services/project'
import { request } from 'services/api'
import { UserContext } from 'utils/datastore/UserContext'

const ProjectDetails = ({ create, isHistory }) => {
  const { errors, getValues, handleSubmit, setValue, formState, ...methods } = useForm()
  const { projectId } = useParams()
  const { user } = useContext(UserContext)

  const [title, setTitle] = useState('New Project')
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [discussions, setDiscussions] = useState({})

  let history = useHistory()
  const isAdmin = user.is_admin

  const fields = [
    'department',
    'description',
    'deadline',
    'prototype_url',
    'request_type',
    'access_url',
    'assets_url',
  ]

  const fetchProjectData = useCallback(async () => {
    if (projectId === undefined) return
    if (isHistory && isAdmin === false) {
      history.push('/project/create/')
    }
    const url = isHistory ? PROJECT_HISTORY_BY_ID_URL(projectId) : PROJECT_BY_ID_URL(projectId)
    const [data, error] = await request(url)
    if (error || create) return

    const isReadOnly = isHistory || isAdmin || data.status !== 'draft'
    setIsReadOnly(isReadOnly)

    setTitle(data.title)
    fields.forEach(field => {
      setValue(field, data[field])
    })

    const discussions = {}
    data.discussions.forEach(({ target_field_name, ...rest }) => {
      discussions[target_field_name] = { ...rest }
    })
    setDiscussions(discussions)
  }, [projectId])

  useEffect(() => {
    fetchProjectData()
  }, [fetchProjectData])

  const getPayload = () => {
    const values = getValues()
    const payload = {
      title: title,
      department: values.department === '' ? 'other' : values.department,
      request_type: values.request_type === '' ? 'new_project' : values.request_type,
      deadline: values.deadline === '' ? null : values.deadline,
      access_url: values.access_url,
      prototype_url: values.prototype_url,
      description: values.description,
      assets_url: values.assets_url,
    }
    return payload
  }

  const onSubmitSave = async () => {
    const payload = getPayload()
    let deadline = payload.deadline
    payload.deadline = deadline === '' ? null : deadline
    const [data] = await postProjectById(create, projectId, payload)
    {
      create && history.push(`/project/${data.id}`)
    }
  }

  const onSubmitSubmit = async () => {
    const payload = getPayload()
    const [data] = await postProjectById(create, projectId, payload)
    await putProjectStatus(data.id, 'submitted')
    {
      create && history.push(`/project/${data.id}`)
    }
    fetchProjectData()
  }

  const TreeCardButton = !isReadOnly && (
    <Link to="/page/create/">
      <Button bg="accent" leftIcon="add" variant="solid" disabled={isReadOnly}>
        Create new page
      </Button>
    </Link>
  )

  return (
    <Stack width="100%" direction="column" align="center" spacing={0} mt="2vh">
      <Stack width={['95%', '85%']} spacing="2vh">
        <Breadcrumb
          pages={[
            { path: '/dashboard/', name: 'Dashboard' },
            { path: `/project/${projectId}/`, name: title },
          ]}
        />
        <Flex
          direction={['column', 'column', 'column', 'row']}
          justify="space-between"
          align="center"
          mt="0.5rem"
        >
          <Editable
            placeholder="New Project"
            fontWeight="600"
            fontSize={['2xl', '3xl']}
            isPreviewFocusable={!isReadOnly}
            onChange={value => setTitle(value)}
            mt="4vh"
            isDisabled={isReadOnly}
          >
            {({ isEditing, onRequestEdit }) => (
              <Flex>
                <EditableInput value={title} />
                {isEditing || (
                  <>
                    <Text onClick={onRequestEdit}>{title}</Text>
                    {!isReadOnly && (
                      <IconButton
                        variant="ghost"
                        icon="edit"
                        aria-label="Edit project name"
                        size="lg"
                        _hover={{ bg: 'white' }}
                        onClick={onRequestEdit}
                      />
                    )}
                  </>
                )}
              </Flex>
            )}
          </Editable>
          {!isReadOnly && (
            <ButtonGroup spacing={4}>
              <Button
                borderColor="primary"
                color="primary"
                variant="outline"
                onClick={onSubmitSave}
                // isLoading={formState.isSubmitting}
              >
                Save as draft
              </Button>
              <Button
                bg="primary"
                color="white"
                variant="solid"
                onClick={handleSubmit(onSubmitSubmit)}
                isLoading={formState.isSubmitting}
              >
                Submit
              </Button>
            </ButtonGroup>
          )}
        </Flex>
        <Flex direction={['column', 'column', 'column', 'row']} justify="space-between">
          <FormProvider
            {...methods}
            setValue={setValue}
            create={create}
            isReadOnly={isReadOnly}
            isHistory={isHistory}
            errors={errors}
            discussions={discussions}
            targetProjectId={projectId}
          >
            <ProjectInfoForm create={create} isReadOnly={isReadOnly} />
          </FormProvider>
          <Card title="Project Tree" button={TreeCardButton}>
            <TreeContainer
              projectId={projectId}
              isHistory={isHistory}
              isReadOnly={isReadOnly}
              create={create}
            />
          </Card>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default ProjectDetails

ProjectDetails.propTypes = {
  create: PropTypes.bool.isRequired,
  isHistory: PropTypes.bool.isRequired,
}
