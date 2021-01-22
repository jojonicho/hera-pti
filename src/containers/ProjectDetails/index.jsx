import {
  Badge,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/core'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { ProjectInfoForm, Card, Breadcrumb } from 'components'
import { useForm, FormProvider } from 'react-hook-form'
import TreeContainer from 'components/TreeContainer'
import { Layout } from 'components/Layout'

import { useParams, useHistory } from 'react-router-dom'
import { PROJECT_BY_ID_URL, PROJECT_HISTORY_BY_ID_URL, PAGE_URL } from 'constants/urls'
import { postProjectById, putProjectStatus } from 'services/project'
import { request } from 'services/api'
import generateStatusBadgeProps from 'utils/table/generateStatusBadgeProps'
import { UserContext } from 'utils/datastore/UserContext'
import { hasPrefix, trimPrefix } from 'utils/projectdetails/department'
import { convertDateFormat } from 'utils/datepicker'

const fields = [
  'department',
  'other_department',
  'receiver',
  'description',
  'deadline',
  'prototype_url',
  'request_type',
  'access_url',
  'assets_url',
]

const ProjectDetails = ({ create, isHistory }) => {
  const { errors, getValues, setValue, formState, handleSubmit, ...methods } = useForm()
  const { projectId } = useParams()
  const { user } = useContext(UserContext)

  const [title, setTitle] = useState('New Project')
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [discussions, setDiscussions] = useState({})
  const [department, setDepartment] = useState('')
  const [version, setVersion] = useState('')
  const [status, setStatus] = useState('')
  const [statusBadgeProps, setStatusBadgeProps] = useState('')
  const [deadline, setDeadline] = useState(new Date())
  const [isSubmitModalShown, setIsSubmitModalShown] = useState(false)

  let history = useHistory()
  const toast = useToast()
  const isAdmin = user.is_admin

  const fetchProjectData = useCallback(async () => {
    if (!projectId) return
    if (isHistory && !isAdmin) {
      history.push('/project/create/')
    }

    const url = isHistory ? PROJECT_HISTORY_BY_ID_URL(projectId) : PROJECT_BY_ID_URL(projectId)
    const [data, error] = await request(url)

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

    if (create) return

    const isReadOnly = isHistory || isAdmin || data.status !== 'draft'
    setIsReadOnly(isReadOnly)

    setTitle(data.title)
    setVersion(data.version)
    setStatus(data.status)
    setStatusBadgeProps(generateStatusBadgeProps(data.status))
    fields.forEach(field => {
      if (field === 'deadline') {
        setDeadline(new Date(data[field]))
      }
      if (field === 'receiver' && data[field]) {
        !isHistory ? setValue(field, data[field].id) : setValue(field, data[field])
        return
      }
      if (field === 'department') {
        if (hasPrefix('Other:', data[field])) {
          setValue(field, 'other')
          setDepartment('other')
          return
        }
        setDepartment(data[field])
      }
      if (field === 'other_department') {
        const otherDepartmentValue = hasPrefix('Other:', data['department'])
          ? trimPrefix('Other:', data['department'])
          : ''
        setValue(field, otherDepartmentValue)
        return
      }
      setValue(field, data[field])
    })

    const discussions = {}
    data.discussions.forEach(({ target_field_name, ...rest }) => {
      if (!discussions[target_field_name]) {
        discussions[target_field_name] = []
      }
      discussions[target_field_name].push(rest)
    })
    setDiscussions(discussions)
  }, [projectId, create, history, isHistory, setValue, toast, isAdmin])

  useEffect(() => {
    fetchProjectData()
  }, [fetchProjectData])

  const getPayload = () => {
    const values = getValues()
    const payload = {
      title: title,
      department: !values.department
        ? 'other'
        : values.department === 'other'
        ? 'Other: ' + values.other_department
        : values.department,
      request_type: !values.request_type ? 'new_project' : values.request_type,
      deadline: convertDateFormat(deadline),
      access_url: values.access_url,
      prototype_url: values.prototype_url,
      description: values.description,
      assets_url: values.assets_url,
      receiver: values.receiver,
    }
    return payload
  }

  const onSave = async () => {
    const payload = getPayload()
    const [data, error] = await postProjectById(create, projectId, payload)
    if (error) {
      console.log(error)
      toast({
        title: create ? 'Can not create project.' : 'An error occurred.',
        description: error.statusText,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    toast({
      title: 'Project saved sucessfully!',
    })
    if (create) {
      history.push(`/project/${data.id}`)
    }
    fetchProjectData()
  }

  const onSubmit = async () => {
    const payload = getPayload()
    const [data, error] = await postProjectById(create, projectId, payload)
    await putProjectStatus(data.id, 'submitted')
    if (error) {
      console.log(error)
      toast({
        title: create ? 'Can not create project.' : 'An error occurred.',
        description: error.statusText,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    toast({
      title: 'Request submitted sucessfully!',
    })
    if (create) {
      history.push(`/project/${data.id}`)
    }
    fetchProjectData()
  }

  const onCreatePageClick = async () => {
    const [data, error] = await request(PAGE_URL, { project: projectId }, 'POST')
    if (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: create ? 'Please save this project first' : error.statusText,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }

    let pageId = data.id
    history.push(`/page/${pageId}/create/`)
  }

  const TreeCardButton = !isReadOnly ? (
    <Button
      bg="accent"
      leftIcon="add"
      variant="solid"
      disabled={isReadOnly}
      onClick={onCreatePageClick}
    >
      Create new page
    </Button>
  ) : (
    <></>
  )

  const SubmitModal = (
    <Modal isOpen={isSubmitModalShown}>
      <ModalOverlay />
      <ModalContent borderRadius="20px" maxWidth="500px" maxHeight="570px">
        <ModalHeader display="flex" justifyContent="space-between">
          <Heading size="md">Submit</Heading>
          <Button variantColor="gray" variant="link" onClick={() => setIsSubmitModalShown(false)}>
            Cancel
          </Button>
        </ModalHeader>
        <ModalBody pb="46px">
          <Stack
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            flexDir="column"
            overflowY="auto"
            maxHeight="445px"
            className="custom-scrollbar"
          >
            <Text fontWeight="bold" fontSize="1.25em">
              Proceed with your submission?
            </Text>
            <Text color="crimson">
              You cannot edit your request after it is submitted, contact our admin to revoke your
              submission if needed
            </Text>
            <Button
              width="45%"
              bg="primary"
              mt="1em"
              color="white"
              onClick={() => {
                onSubmit()
                setIsSubmitModalShown(false)
              }}
            >
              Submit
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

  return (
    <Layout>
      <Stack width="100%" direction="column" align="center" spacing={0} mt="2vh">
        <Stack width={['95%', '85%']} spacing="2vh">
          <Breadcrumb
            pages={[
              { path: '/dashboard/', name: 'Dashboard' },
              {
                path: isHistory ? `/project/${projectId}/history/` : `/project/${projectId}/`,
                name: title,
              },
            ]}
          />
          (
          <>
            <Flex
              direction={['column', 'column', 'column', 'row']}
              justify="space-between"
              align="center"
              mt="0.5rem"
              mb="0.5rem"
            >
              <Editable
                placeholder="New Project"
                fontWeight="600"
                fontSize={['2xl', '3xl']}
                isPreviewFocusable={!isReadOnly}
                onChange={value => setTitle(value)}
                isDisabled={isReadOnly}
              >
                {({ isEditing, onRequestEdit }) => (
                  <Flex align="center">
                    <EditableInput value={title} />
                    {!isEditing && (
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
                        {isHistory && (
                          <Badge
                            ml="0.3rem"
                            mt={['0.3rem', '0.6rem']}
                            fontSize="sm"
                            alignItems="center"
                            verticalAlign="center"
                            p={2}
                          >
                            History v{version}
                          </Badge>
                        )}
                        {!isHistory && status !== 'draft' && (
                          <Badge
                            ml="0.3rem"
                            mt={['0.3rem', '0.6rem']}
                            fontSize="sm"
                            alignItems="center"
                            verticalAlign="middle"
                            bg={statusBadgeProps.bg}
                            color={statusBadgeProps.color}
                            p={2}
                          >
                            {status === 'in_review' ? 'In Review' : status}
                          </Badge>
                        )}
                      </>
                    )}
                  </Flex>
                )}
              </Editable>
              {!isReadOnly && (
                <ButtonGroup spacing={4}>
                  <Button borderColor="primary" color="primary" variant="outline" onClick={onSave}>
                    Save as draft
                  </Button>
                  <Button
                    bg="primary"
                    color="white"
                    variant="solid"
                    onClick={handleSubmit(() => setIsSubmitModalShown(true))}
                    isLoading={formState.isSubmitting}
                  >
                    Submit
                  </Button>
                </ButtonGroup>
              )}
            </Flex>
          </>
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
              <ProjectInfoForm
                create={create}
                isReadOnly={isReadOnly}
                dept={department}
                deadline={deadline}
                setDeadline={setDeadline}
              />
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
        {SubmitModal}
      </Stack>
    </Layout>
  )
}

export default ProjectDetails

ProjectDetails.propTypes = {
  create: PropTypes.bool,
  isHistory: PropTypes.bool,
}
