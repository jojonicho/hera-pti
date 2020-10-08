import React from 'react'
import { Box } from '@chakra-ui/core'
import Pagination from '../../components/Pagination'
import Table from '../../components/Table'

const isAdmin = false

const Dashboard = () => {
  const fetchedData = {
    count: 3,
    next: null,
    previous: null,
    results: [
      {
        id: 'b9f9c59e-fa8e-4c6c-97fd-052d08aba2e2',
        title: 'iMaba',
        description: 'Possibly room for short description?',
        version: 1,
        deadline: '2020-09-25',
        figma_url: '',
        assets_url: '',
        request_type: 'new_project',
        access_url: 'lol',
        status: 'completed',
        requester: {
          name: 'Media',
        },
        created_at: '2020-09-25T15:57:49.468572Z',
        updated_at: '2020-09-25T15:57:49.469234Z',
        deleted_at: null,
        sum_unread_count: null,
        discussion_set: [
          {
            id: '4365cc66-f1ae-47b8-9dd6-160bd552f5bf',
            unread_count: 22,
          },
          {
            id: 'ae6904ca-e952-43ff-af2e-0563fa6f705a',
            unread_count: 17,
          },
        ],
      },
      {
        id: 'fdb5eb38-53d8-4411-aef6-e45327e4d265',
        title: 'Pokemon League Admission Site',
        description: 'Registration page to the Indigo Championship League',
        version: 4,
        deadline: '2020-09-25',
        figma_url: '',
        assets_url: '',
        request_type: 'improvement',
        access_url: 'z',
        status: 'in-review',
        requester: {
          name: 'PTI',
        },
        created_at: '2020-09-25T15:58:18.307232Z',
        updated_at: '2020-09-25T15:58:18.307232Z',
        deleted_at: null,
        sum_unread_count: 99,
        discussion_set: [],
      },
      {
        id: 'a8ecbd79-69ba-4769-afb1-8e65451d5705',
        title: 'Order-A-Ninja',
        description: 'Send some ninjas on a mission to do your deeds',
        version: 99,
        deadline: '2020-09-25',
        figma_url: '',
        assets_url: '',
        request_type: 'bug_fix',
        access_url: 'z',
        status: 'accepted',
        requester: {
          name: 'Others',
        },
        created_at: '2020-09-25T15:58:45.686384Z',
        updated_at: '2020-09-25T15:58:45.686384Z',
        deleted_at: null,
        sum_unread_count: 1,
        discussion_set: [
          {
            id: '9c020172-ee2e-4f7a-b6b9-36c68bcfe0db',
            unread_count: 32,
          },
        ],
      },
      {
        id: 'a9ecbd79-69ba-4769-afb1-8e65451d5705',
        title: 'Another Project Name',
        description:
          'Lorem ipsum dolor sit amet because I cant think up any more witty project names',
        version: 101,
        deadline: '2020-09-25',
        figma_url: '',
        assets_url: '',
        request_type: 'bug_fix',
        access_url: 'z',
        status: 'ongoing',
        requester: {
          name: 'Kestari',
        },
        created_at: '2020-10-27T15:58:45.686384Z',
        updated_at: '2020-10-27T17:58:45.686384Z',
        deleted_at: null,
        sum_unread_count: 5,
        discussion_set: [
          {
            id: '9c020172-ee2e-4f7a-b6b9-36c68bcfe0db',
            unread_count: 32,
          },
        ],
      },
      {
        id: 'a0ecbd79-69ba-4769-afb1-8e65451d5705',
        title: 'Yet Another Project Name',
        description: 'This one is also lorem ipsum cuz I ran out of ideas',
        version: 2,
        deadline: '2020-09-25',
        figma_url: '',
        assets_url: '',
        request_type: 'bug_fix',
        access_url: 'z',
        status: 'rejected',
        requester: {
          name: 'Adkesma',
        },
        created_at: '2020-11-07T15:58:45.686384Z',
        updated_at: '2020-11-07T15:58:45.686384Z',
        deleted_at: null,
        sum_unread_count: null,
        discussion_set: [
          {
            id: '9c020172-ee2e-4f7a-b6b9-36c68bcfe0db',
            unread_count: 32,
          },
        ],
      },
      {
        id: 'a0ecbd79-69ba-4769-afb1-8e65451d5305',
        title: 'A Dummy Project',
        description: 'This one is also lorem ipsum cuz I ran out of ideas',
        version: 5,
        deadline: '2020-09-25',
        figma_url: '',
        assets_url: '',
        request_type: 'bug_fix',
        access_url: 'z',
        status: 'draft',
        requester: {
          name: 'Kastrat',
        },
        created_at: '2020-11-07T15:58:45.686384Z',
        updated_at: '2020-11-07T15:58:45.686384Z',
        deleted_at: null,
        sum_unread_count: null,
        discussion_set: [
          {
            id: '9c020172-ee2e-4f7a-b6b9-36c68bcfe0db',
            unread_count: 32,
          },
        ],
      },
    ],
  }

  const projects = fetchedData.results

  return (
    <Box display="flex" flexDir="column" alignItems="center" width="90%">
      <Table projects={projects} isAdmin={isAdmin} />
      {projects.length > 0 && <Pagination totalProjects={projects.length} />}
    </Box>
  )
}

export default Dashboard
