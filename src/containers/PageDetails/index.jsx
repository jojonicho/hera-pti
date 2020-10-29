import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Editable,
  EditableInput,
  Flex,
  Icon,
  IconButton,
  Text,
  Stack,
} from '@chakra-ui/core'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useForm, FormProvider } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

import { PageInfoForm, PageContentForm, TabContainer, Layout } from 'components'
import { PAGE_BY_ID_URL, PAGE_HISTORY_BY_ID_URL } from 'constants/urls'
import { request } from 'services/api'
import { cleanListInput, changeToListInput } from 'utils/form'
import { UserContext } from 'utils/datastore/UserContext'

const PageDetails = ({ create, isHistory }) => {
  const { errors, formState, setValue, getValues, handleSubmit, ...methods } = useForm()
  const { pageId } = useParams()
  const { user } = useContext(UserContext)

  const [isReadOnly, setIsReadOnly] = useState(false)
  const [pageName, setPageName] = useState('New Page')
  const [project, setProject] = useState({ id: '', title: 'Project' })
  const [discussions, setDiscussions] = useState('')
  const [infoTabBorder, setInfoTabBorder] = useState('')
  const [contentTabBorder, setContentTabBorder] = useState('')

  const pageInfo = (
    <PageInfoForm create={create} isReadOnly={isReadOnly} projectId={project.id} pageId={pageId} />
  )
  const pageContent = <PageContentForm create={create} />
  const fields = [
    'parent',
    'page_url',
    'priority',
    'flow',
    'display_details',
    'preconditions',
    'access_details',
  ]

  const fetchPageData = useCallback(async () => {
    const url = isHistory ? PAGE_HISTORY_BY_ID_URL(pageId) : PAGE_BY_ID_URL(pageId)
    const [data, error] = await request(url)
    if (error || create) {
      return
    }
    const isReadOnly = user.is_admin || isHistory || data.project.status !== 'draft'
    setIsReadOnly(isReadOnly)

    setProject(data.project)
    setPageName(data.title)
    fields.forEach(field => {
      let v = data[field]
      let value = Array.isArray(v) ? changeToListInput(v, isReadOnly) : v
      setValue(field, value)
    })
    setValue('sketch', data.sketch)

    const discussions = {}
    data.discussions.forEach(({ target_field_name, ...rest }) => {
      discussions[target_field_name] = { ...rest }
    })
    setDiscussions(discussions)
  }, [pageId])

  const onSubmit = async () => {
    const values = getValues()
    const payload = {}
    payload.title = pageName
    fields.forEach(field => {
      let v = values[field]
      let value = Array.isArray(v) ? cleanListInput(v) : v
      payload[field] = value
    })
    await request(PAGE_BY_ID_URL(pageId), payload, 'PUT')

    if (values.sketch_is_updated) {
      const data = new FormData()
      data.append('sketch', values.sketch)
      await request(PAGE_BY_ID_URL(pageId), data, 'PUT', {}, true)
    }
  }

  useEffect(() => {
    fetchPageData()
  }, [fetchPageData])

  useEffect(() => {
    const infoInvalid = errors.page_url || errors.access_details || errors.priority
    setInfoTabBorder(infoInvalid ? 'crimson' : '')
    setContentTabBorder(errors.flow ? 'crimson' : '')
  }, [errors.access_details, errors.page_url, errors.priority, errors.flow])

  return (
    <Layout>
      <Stack alignItems="center" justifyContent="center" flexGrow={1}>
        <Stack width={['95%', '85%']} spacing="2vh" mt="3vh">
          <Breadcrumb spacing={[1, 2]} separator={<Icon color="brand" name="chevron-right" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/project/${project.id}`}>{project.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{pageName}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Editable
            placeholder="New Page"
            fontWeight="600"
            fontSize={['2xl', '3xl']}
            isPreviewFocusable={!isReadOnly}
            onChange={value => setPageName(value)}
            isDisabled={isReadOnly}
            mt="4vh"
          >
            {({ isEditing, onRequestEdit }) => (
              <Flex>
                <EditableInput value={pageName} />
                {isEditing || (
                  <>
                    <Text onClick={onRequestEdit}>{pageName}</Text>
                    {!isReadOnly && (
                      <IconButton
                        variant="ghost"
                        icon="edit"
                        aria-label="Edit page name"
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
          <FormProvider
            {...methods}
            errors={errors}
            setValue={setValue}
            create={create}
            isReadOnly={isReadOnly}
            isHistory={isHistory}
            discussions={discussions}
            targetPageId={pageId}
          >
            <TabContainer
              labels={[
                { label: 'General Info', border: infoTabBorder },
                { label: 'Page Content', border: contentTabBorder },
              ]}
              contents={[pageInfo, pageContent]}
            />
          </FormProvider>
          <Flex direction="row" justify="space-between" align="center" mt="0.5rem">
            <Link to={`/project/${project.id}`}>
              <Button
                color="secondary"
                borderColor="secondary"
                variant="outline"
                fontWeight="normal"
                width="9rem"
                fontSize="0.875rem"
              >
                Return to project
              </Button>
            </Link>
            {!isReadOnly && (
              <Button
                bg="primary"
                variantColor="blue"
                fontWeight="normal"
                variant="solid"
                width="8rem"
                isLoading={formState.isSubmitting}
                loadingText="Submitting"
                fontSize="0.875rem"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            )}
          </Flex>
        </Stack>
      </Stack>
    </Layout>
  )
}

PageDetails.propTypes = {
  create: PropTypes.bool,
  isHistory: PropTypes.bool,
}

export default PageDetails
