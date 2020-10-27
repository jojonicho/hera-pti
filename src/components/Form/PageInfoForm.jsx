import { Stack } from '@chakra-ui/core'
import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { Input, ListInput, Select } from 'components/Form/Fields'
import { PRIORITY_CHOICES } from 'constants/options'
import { PROJECT_PAGE_LIST_URL } from 'constants/urls'
import { request } from 'services/api'

const PageInfoForm = ({ create, isReadOnly, projectId, pageId }) => {
  const [parentPageChoices, setParentPageChoices] = useState([])

  const fetchPageList = useCallback(async () => {
    const [data, error] = await request(PROJECT_PAGE_LIST_URL(projectId))
    if (error) {
      return
    }
    const pageList = data
      .filter(({ id }) => id !== pageId)
      .map(({ id, title }) => ({ key: id, value: title }))
    setParentPageChoices(pageList)
  }, [projectId, pageId])

  useEffect(() => {
    fetchPageList()
  }, [fetchPageList])

  return (
    <Stack
      py={['2rem', create ? '10vh' : '2rem']}
      px={['1rem', '2rem']}
      align={create ? 'center' : 'flex-start'}
    >
      <Stack width={['100%', '100%', '100%', '80%']}>
        <Select
          name="parent"
          label="Parent Page"
          create={create}
          isReadOnly={isReadOnly}
          options={parentPageChoices}
        />
        <Input
          name="page_url"
          label="Page URL"
          create={create}
          isRequired
          isReadOnly={isReadOnly}
        />
        <Select
          name="priority"
          label="Page Priority"
          create={create}
          isRequired
          isReadOnly={isReadOnly}
          options={PRIORITY_CHOICES}
        />
        <ListInput
          name="access_details"
          label="Access Details"
          create={create}
          isRequired
          isReadOnly={isReadOnly}
        />
      </Stack>
    </Stack>
  )
}

PageInfoForm.propTypes = {
  create: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  projectId: PropTypes.string,
  pageId: PropTypes.string,
}

export default PageInfoForm
