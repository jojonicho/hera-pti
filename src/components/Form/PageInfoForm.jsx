import { Stack } from '@chakra-ui/core'
import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

import { Input, ListInput, Select } from 'components/Form/Fields'
import { PRIORITY_CHOICES } from 'constants/options'
import { retrievePageListFromProjectApi } from 'services/project'

const PageInfoForm = ({ create, isReadOnly, projectId, pageId, parentPage }) => {
  const [parentPageChoices, setParentPageChoices] = useState([])
  const { setValue } = useFormContext()

  const fetchPageList = useCallback(async () => {
    if (!isReadOnly && projectId && pageId) {
      const [data, error] = await retrievePageListFromProjectApi(projectId)
      if (error) return

      const pageList = data
        .filter(({ id }) => id !== pageId)
        .map(({ id, title }) => ({ key: id, value: title }))
      setParentPageChoices(pageList)
    }
  }, [isReadOnly, projectId, pageId])

  useEffect(() => {
    fetchPageList()
  }, [fetchPageList])

  useEffect(() => {
    setValue('parent', parentPage)
  }, [parentPageChoices, parentPage, setValue])

  return (
    <Stack
      py={['2rem', create ? '10vh' : '2rem']}
      px={['1rem', '2rem']}
      align={create ? 'center' : 'flex-start'}
    >
      <Stack width={['100%', '100%', '100%', '80%']}>
        <Select name="parent" label="Parent Page" options={parentPageChoices} />
        <Input name="page_url" label="Page URL" isRequired />
        <Select name="priority" label="Page Priority" isRequired options={PRIORITY_CHOICES} />
        <ListInput name="access_details" label="Access Details" isRequired />
      </Stack>
    </Stack>
  )
}

PageInfoForm.propTypes = {
  create: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  projectId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  parentPage: PropTypes.string,
}

export default PageInfoForm
