import { CloseButton, Flex, Image, Stack, Text, IconButton } from '@chakra-ui/core'
import React, { useEffect, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import { FileIcon, defaultStyles } from 'react-file-icon'
import FormFieldWrapper from '../FormFieldWrapper'
import { IMAGE_TYPE } from 'constants/input'

const FileInput = ({ name, isRequired, accept, ...props }) => {
  const { register, unregister, setValue, watch, isReadOnly } = useFormContext()

  const [fileDisplay, setFileDisplay] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [extension, setExtension] = useState('')
  const [loadError, setLoadError] = useState(false)
  const inputType = IMAGE_TYPE ? 'image' : 'file'

  const onDrop = useCallback(
    droppedFiles => {
      setValue(name, droppedFiles[0])
      setValue(`${name}_is_updated`, true)
    },
    [setValue, name],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
    disabled: isReadOnly || fileDisplay,
  })
  const file = watch(name)

  const fetchFileBuffer = useCallback(
    async fileUrl => {
      let blob = await fetch(fileUrl).then(r => r.blob())
      blob.name = fileUrl.split('/').pop()
      setValue(name, blob)
    },
    [setValue, name],
  )

  const clearInput = () => {
    setValue(name, null)
    setFileDisplay(null)
    setFileName(null)
    setExtension(null)
  }

  useEffect(() => {
    register(name)
    const fileIsUpdated = `${name}_is_updated`
    register(fileIsUpdated)
    setValue(fileIsUpdated, false)
    return () => {
      unregister(name)
      unregister(fileIsUpdated)
    }
  }, [register, unregister, setValue, name])

  useEffect(() => {
    if (file) {
      try {
        setFileDisplay(URL.createObjectURL(file))
        setFileName(file.name)
        setExtension(file.name.split('.').pop())
      } catch (error) {
        fetchFileBuffer(file)
      }
    }
  }, [file, fetchFileBuffer])

  return (
    <FormFieldWrapper {...props} name={name} isRequired={isRequired}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Stack
          align="center"
          justify="center"
          bg="form"
          rounded="md"
          border="dashed"
          borderColor={isDragActive ? 'secondary' : 'border'}
          height="7rem"
          padding="0.5rem"
        >
          {file ? (
            <Flex justify="space-between" width="100%" align="center">
              <Flex align="center" width="80%">
                {loadError ? (
                  <Flex width="4rem">
                    <FileIcon extension={extension} {...defaultStyles[extension]} />
                  </Flex>
                ) : (
                  <Image
                    src={fileDisplay}
                    onError={() => setLoadError(true)}
                    maxWidth="50%"
                    maxHeight="6rem"
                    objectFit="cover"
                  />
                )}
                <Text fontSize={['xs', 'md']} p="0 0.5rem">
                  {fileName}
                </Text>
              </Flex>
              <Flex direction={['column', 'row']} align="center">
                <a href={fileDisplay} download={fileName}>
                  <IconButton
                    icon="download"
                    bg="transparent"
                    _hover={{ bg: 'formaddon' }}
                    aria-label="Download"
                    size="sm"
                  />
                </a>
                {!isReadOnly && <CloseButton onClick={clearInput} _hover={{ bg: 'formaddon' }} />}
              </Flex>
            </Flex>
          ) : (
            <Text color="border" fontSize="xs">
              Drop your {inputType} here or click to upload.
            </Text>
          )}
        </Stack>
      </div>
    </FormFieldWrapper>
  )
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
  accept: PropTypes.string,
}

export default FileInput
