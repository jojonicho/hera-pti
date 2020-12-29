import {
  Badge,
  Button,
  Editable,
  EditableInput,
  Flex,
  IconButton,
  Text,
  Stack,
} from '@chakra-ui/core'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useForm, FormProvider } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

import { PageInfoForm, PageContentForm, TabContainer, Layout, Breadcrumb } from 'components'
import { LoadingPage } from 'containers'
import { retrievePageApi, retrievePageHistoryApi, updatePageApi } from 'services/page'
import { cleanData, changeToInput } from 'utils/form'
import { UserContext } from 'utils/datastore/UserContext'
import { ApiContext } from 'utils/datastore/ApiContext'
import { withErrorHandler } from 'decorators'

const inputFields = [
  'parent',
  'page_url',
  'priority',
  'flow',
  'display_details',
  'preconditions',
  'access_details',
]

const PageDetails = ({ create, isHistory }) => {
  const { errors, formState, setValue, getValues, handleSubmit, ...methods } = useForm()
  const { pageId } = useParams()
  const { setError } = useContext(ApiContext)
  const { user } = useContext(UserContext)

  const [isReadOnly, setIsReadOnly] = useState(false)
  const [pageName, setPageName] = useState('New Page')
  const [parent, setParent] = useState('')
  const [project, setProject] = useState({ id: '', title: 'Project' })
  const [discussions, setDiscussions] = useState({})
  const [infoTabBorder, setInfoTabBorder] = useState('')
  const [contentTabBorder, setContentTabBorder] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const pageInfo = (
    <PageInfoForm
      create={create}
      isReadOnly={isReadOnly}
      projectId={project.id}
      pageId={pageId}
      parentPage={parent}
    />
  )
  const pageContent = <PageContentForm create={create} />

  const fetchPageData = useCallback(async () => {
    const retrievePage = isHistory ? retrievePageHistoryApi : retrievePageApi
    const [data, error, response] = await retrievePage(pageId)
    setIsLoading(false)
    if (error) {
      setError({ error, response })
      return
    }

    if (!create) {
      const isReadOnly = user.is_admin || isHistory || data.project.status !== 'draft'
      setIsReadOnly(isReadOnly)

      setProject(data.project)
      setPageName(data.title)
      setParent(data.parent)
      inputFields.forEach(field => setValue(field, changeToInput(data[field], isReadOnly)))
      setValue('sketch', data.sketch)

      const discussions = {}
      data.discussions.forEach(({ target_field_name, ...rest }) => {
        if (!discussions[target_field_name]) {
          discussions[target_field_name] = []
        }
        discussions[target_field_name].push(rest)
      })

      setDiscussions(discussions)
    }
  }, [pageId, create, isHistory, setValue, user, setError])

  const onSubmit = async () => {
    const values = getValues()
    const payload = { title: pageName }
    inputFields.forEach(field => (payload[field] = cleanData(values[field])))
    await updatePageApi(pageId, payload)

    if (values.sketch_is_updated) {
      const data = new FormData()
      data.append('sketch', values.sketch)
      await updatePageApi(pageId, data)
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

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <Stack align="center" flexGrow={1}>
        <Stack width={['95%', '85%']} spacing="2vh">
          <Breadcrumb
            pages={[
              { path: '/dashboard/', name: 'Dashboard' },
              { path: `/project/${project.id}/`, name: project.title },
              { path: `/page/${pageId}/`, name: pageName },
            ]}
          />
          <Editable
            placeholder="New Page"
            fontWeight="600"
            fontSize={['2xl', '3xl']}
            isPreviewFocusable={!isReadOnly}
            onChange={value => setPageName(value)}
            isDisabled={isReadOnly}
            mt="5vh"
          >
            {({ isEditing, onRequestEdit }) => (
              <Flex align="flex-start">
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
                    {isHistory && (
                      <Badge ml="0.3rem" mt={['0.3rem', '0.6rem']} fontSize="sm">
                        History v{project.version}
                      </Badge>
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

export default withErrorHandler(PageDetails)
