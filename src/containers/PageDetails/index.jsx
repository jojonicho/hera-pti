import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  Flex,
  Icon,
  IconButton,
  Stack,
} from '@chakra-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { PageInfoForm, PageContentForm, TabContainer } from 'components'

const PageDetails = ({ create, isReadOnly, projectName }) => {
  const { register, control, errors } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const pageInfo = (
    <PageInfoForm
      register={register}
      control={control}
      errors={errors}
      create={create}
      isReadOnly={isReadOnly}
    />
  )
  const pageContent = (
    <PageContentForm
      register={register}
      control={control}
      create={create}
      isReadOnly={isReadOnly}
    />
  )

  return (
    <Stack width="100%" direction="column" align="center" spacing={0} mt="2vh">
      <Stack width={['95%', '85%']} spacing="2vh">
        <Breadcrumb spacing={[1, 2]} separator={<Icon color="brand" name="chevron-right" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/project">Project</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="/page">New Page</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Editable
          defaultValue="New Page"
          placeholder="New Page"
          fontWeight="600"
          fontSize={['2xl', '3xl']}
          isPreviewFocusable={!isReadOnly}
          mt="4vh"
        >
          {({ isEditing, onRequestEdit }) => (
            <>
              <EditablePreview />
              <EditableInput register={register} name="pagename" />
              {isEditing || (
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
        </Editable>
        <TabContainer
          labels={['General Info', 'Page Content']}
          contents={[pageInfo, pageContent]}
        />
        <Flex direction="row" justify="space-between" align="center" mt="0.5rem">
          <Button
            color="secondary"
            borderColor="secondary"
            variant="outline"
            fontWeight="normal"
            width="9rem"
            fontSize="0.875rem"
          >
            Return to {projectName || 'project'}
          </Button>
          <Button
            bg="primary"
            variantColor="blue"
            fontWeight="normal"
            variant="solid"
            width="8rem"
            isLoading={isLoading}
            loadingText="Submitting"
            fontSize="0.875rem"
            onClick={() => setIsLoading(true)}
          >
            Save
          </Button>
        </Flex>
      </Stack>
    </Stack>
  )
}

PageDetails.propTypes = {
  create: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  projectName: PropTypes.string,
}

export default PageDetails
