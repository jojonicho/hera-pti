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
import { Link, useParams, useHistory } from 'react-router-dom'

import { PageInfoForm, PageContentForm, TabContainer, Layout, Breadcrumb } from 'components'
import { LoadingPage } from 'containers'
import { retrievePageListFromProjectApi } from 'services/project'
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
  const methods = useForm()
  const { errors, formState, setValue, getValues, handleSubmit } = methods
  const { pageId } = useParams()
  const history = useHistory()
  const { setError } = useContext(ApiContext)
  const { user } = useContext(UserContext)

  const [isReadOnly, setIsReadOnly] = useState(false)
  const [pageName, setPageName] = useState('New Page')
  const [parent, setParent] = useState('')
  const [project, setProject] = useState({ id: '', title: 'Project' })
  const [discussions, setDiscussions] = useState({})

  const [parentPageOptions, setParentPageOptions] = useState([])
  const [infoTabBorder, setInfoTabBorder] = useState('')
  const [contentTabBorder, setContentTabBorder] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const pageInfo = (
    <PageInfoForm create={create} parentPageOptions={parentPageOptions} parentPage={parent} />
  )
  const pageContent = <PageContentForm create={create} />

  const setPageTitle = pageName => {
    setPageName(pageName || 'New Page')
  }

  const fetchPageData = useCallback(async () => {
    const retrievePage = isHistory ? retrievePageHistoryApi : retrievePageApi
    const [data, error, response] = await retrievePage(pageId)
    setIsLoading(false)
    if (error) {
      setError({ error, response })
      return
    }

    const isReadOnly = user.is_admin || isHistory || data.project.status !== 'draft'
    setIsReadOnly(isReadOnly)

    setPageTitle(data.title)
    setProject(data.project)
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
  }, [pageId, isHistory, setValue, user, setError])

  const fetchParentPageOptions = useCallback(async () => {
    if (project.id) {
      const [data, error, response] = await retrievePageListFromProjectApi(project.id)
      if (error) {
        setError({ error, response })
        return
      }

      const pageOptions = data
        .filter(({ id }) => id !== pageId)
        .map(page => ({ value: page.id, label: page.title }))
      setParentPageOptions(pageOptions)
    }
  }, [setError, project, pageId])

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
    create && history.push(`/page/${pageId}/`)
  }

  useEffect(() => {
    fetchPageData()
  }, [fetchPageData])

  useEffect(() => {
    fetchParentPageOptions()
  }, [fetchParentPageOptions])

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
        <Stack width={['90%', '85%']} spacing="2vh">
          <Breadcrumb
            pages={[
              { path: '/dashboard/', name: 'Dashboard' },
              {
                path: isHistory ? `/project/${project.id}/history/` : `/project/${project.id}/`,
                name: project.title,
              },
              {
                path: isHistory ? `/page/${pageId}/history/` : `/page/${pageId}/`,
                name: pageName,
              },
            ]}
          />
          <Editable
            placeholder="New Page"
            fontWeight="600"
            fontSize={['2xl', '3xl']}
            isPreviewFocusable={!isReadOnly}
            onChange={setPageTitle}
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
            <Link to={isHistory ? `/project/${project.id}/history/` : `/project/${project.id}/`}>
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
