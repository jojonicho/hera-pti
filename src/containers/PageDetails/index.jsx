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
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useFetch } from 'hooks'

import { RequesterLayout } from 'components/Layout/Layouts/RequesterLayout'
import { PageInfoForm, PageContentForm, TabContainer } from 'components'
import { PAGE_BY_ID_URL } from 'constants/urls'
import { request } from 'services/api'
import { cleanListInput, changeToListInput } from 'utils/form'

const PageDetails = ({ create, isReadOnly }) => {
  const { errors, formState, setValue, getValues, handleSubmit, ...methods } = useForm()
  const { pageId } = useParams()
  const { data, loading } = useFetch(PAGE_BY_ID_URL(pageId))

  const [pageName, setPageName] = useState('New Page')
  const [project, setProject] = useState({ id: '', title: 'Project' })
  const [infoTabBorder, setInfoTabBorder] = useState('')
  const [contentTabBorder, setContentTabBorder] = useState('')

  const pageInfo = (
    <PageInfoForm create={create} isReadOnly={isReadOnly} projectId={project.id} pageId={pageId} />
  )
  const pageContent = <PageContentForm create={create} isReadOnly={isReadOnly} />

  useEffect(() => {
    const infoInvalid = errors.page_url || errors.access_details || errors.priority
    setInfoTabBorder(infoInvalid ? 'crimson' : '')
    setContentTabBorder(errors.flow ? 'crimson' : '')
  }, [errors.access_details, errors.page_url, errors.priority, errors.flow])

  useEffect(() => {
    if (data && !create) {
      setProject(data.project)
      setPageName(data.title)
      Object.entries(data).forEach(([key, v]) => {
        let value = v
        if (Array.isArray(v)) {
          value = changeToListInput(v, isReadOnly)
        }
        setValue(key, value)
      })
    }
  }, [data, loading, create, isReadOnly, setValue])

  const onSubmit = async () => {
    const value = getValues()
    const payload = {
      title: pageName,
      parent: value.parent,
      page_url: value.page_url,
      priority: value.priority,
      flow: cleanListInput(value.flow),
      display_details: cleanListInput(value.display_details),
      preconditions: cleanListInput(value.preconditions),
      access_details: cleanListInput(value.access_details),
    }
    await request(PAGE_BY_ID_URL(pageId), payload, 'PUT')
  }

  return (
    <RequesterLayout>
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
          mt="4vh"
        >
          {({ isEditing, onRequestEdit }) => (
            <Flex>
              <EditableInput value={pageName} />
              {isEditing || (
                <>
                  <Text onClick={onRequestEdit}>{pageName}</Text>
                  <IconButton
                    variant="ghost"
                    icon="edit"
                    aria-label="Edit page name"
                    size="lg"
                    _hover={{ bg: 'white' }}
                    onClick={onRequestEdit}
                  />
                </>
              )}
            </Flex>
          )}
        </Editable>
        <FormProvider {...methods} errors={errors} setValue={setValue}>
          <TabContainer
            labels={[
              { label: 'General Info', border: infoTabBorder },
              { label: 'Page Content', border: contentTabBorder },
            ]}
            contents={[pageInfo, pageContent]}
          />
        </FormProvider>
        <Flex direction="row" justify="space-between" align="center" mt="0.5rem">
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
        </Flex>
      </Stack>
    </RequesterLayout>
  )
}

PageDetails.propTypes = {
  create: PropTypes.bool,
  isReadOnly: PropTypes.bool,
}

export default PageDetails
