import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
} from '@chakra-ui/core'
import { request } from 'services/api'
import { PROJECT_URL } from 'constants/urls'
import VersionItem from './VersionItem'

const filterNonAdminData = (data, isAdmin) => data.filter(d => !d.project_history || isAdmin)

const VersionHistoryModal = ({ projectId, isModalShown, setIsModalShown, isAdmin = false }) => {
  const toast = useToast()
  const [versions, setVersions] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const [data, error] = await request(`${PROJECT_URL}${projectId}/status-history`)
      setLoading(false)

      if (!(!data || data.error || error)) {
        setVersions(filterNonAdminData(data, isAdmin))
      } else {
        toast({
          title: 'An error occurred.',
          description: error.statusText,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }

    if (isModalShown) {
      fetchData()
    }
  }, [isModalShown, isAdmin, projectId, toast])

  return (
    <Modal isOpen={isModalShown}>
      <ModalOverlay />
      <ModalContent borderRadius="20px" maxWidth="500px" maxHeight="570px">
        <ModalHeader display="flex" justifyContent="space-between">
          <Heading size="md">History</Heading>
          <Button variantColor="gray" variant="link" onClick={() => setIsModalShown(false)}>
            Hide
          </Button>
        </ModalHeader>
        <ModalBody pb="46px">
          {isLoading ? (
            <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
              <Spinner size="xl" />
            </Box>
          ) : (
            <Box
              display="flex"
              flexDir="column"
              overflowY="auto"
              maxHeight="445px"
              className="custom-scrollbar"
            >
              {versions.map((version, i) => (
                <VersionItem
                  key={version.version}
                  data={{ ...version, isLastElement: i === versions.length - 1 }}
                />
              ))}
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

VersionHistoryModal.propTypes = {
  isAdmin: PropTypes.bool,
  projectId: PropTypes.string.isRequired,
  isModalShown: PropTypes.bool.isRequired,
  setIsModalShown: PropTypes.func.isRequired,
}

export default VersionHistoryModal
