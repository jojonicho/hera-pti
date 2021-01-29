import DatePicker from 'react-datepicker'
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import FormFieldWrapper from '../FormFieldWrapper'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.css'

const Datepicker = ({
  name,
  isRequired,
  isHidden,
  isNoDiscussion,
  deadline,
  setDeadline,
  ...props
}) => {
  const { isReadOnly } = useFormContext()

  return (
    <FormFieldWrapper
      {...props}
      name={name}
      isRequired={isRequired}
      isHidden={isHidden}
      isNoDiscussion={isNoDiscussion}
    >
      <DatePicker
        name={name}
        readOnly={isReadOnly}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        onKeyDown={e => e.preventDefault()}
        _disabled={{ bg: 'form' }}
        selected={deadline}
        onChange={date => setDeadline(date)}
      />
    </FormFieldWrapper>
  )
}

Datepicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
  isHidden: PropTypes.bool,
  isNoDiscussion: PropTypes.bool,
  deadline: PropTypes.instanceOf(Date),
  setDeadline: PropTypes.func,
}

export default Datepicker
