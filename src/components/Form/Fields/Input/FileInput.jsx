import { CloseButton, Flex, Image, Stack, Text } from '@chakra-ui/core'
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
    disabled: isReadOnly,
  })
  const file = watch(name)

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
      let fileDisplay = ''
      let fileName = ''
      try {
        fileDisplay = URL.createObjectURL(file)
        fileName = file.name
      } catch (error) {
        fileDisplay = file
        fileName = file.split('/').pop()
      }
      const ext = fileName.split('.').pop()

      setFileDisplay(fileDisplay)
      setFileName(fileName)
      setExtension(ext)
      setLoadError(false)
    }
  }, [file])

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
                <Text fontSize={['xs', 'md']} ml="0.5rem">
                  {fileName}
                </Text>
              </Flex>
              {!isReadOnly && <CloseButton onClick={() => setValue(name, null)} />}
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
