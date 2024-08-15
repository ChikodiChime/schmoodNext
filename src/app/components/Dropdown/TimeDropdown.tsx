'use client'
import React, { useState,  useLayoutEffect } from 'react'
import Select, { components, MultiValue } from 'react-select'

export interface Option {
  value: string
  label: string
}

const options: Option[] = [
  { value: 'Breakfast', label: 'Breakfast' },
  { value: 'Lunch', label: 'Lunch' },
  { value: 'Dinner', label: 'Dinner' },
  { value: 'Snack', label: 'Snack' },
  // Add more options as needed
]

const CheckboxOption: React.FC<any> = (props) => {
  return (
    <components.Option {...props}>
      <input
        type='checkbox'
        checked={props.isSelected}
        onChange={() => {}}
        style={{ marginRight: 10 }}
      />
      {props.label}
    </components.Option>
  )
}

interface MultiSelectDropdownProps {
  selectedTime: Option[]
  onChange: (selectedOptions: Option[]) => void
}

const TODDropdown: React.FC<MultiSelectDropdownProps> = ({ selectedTime, onChange }) => {
  const [isMounted, setIsMounted] = useState(false)

  useLayoutEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChange = (selectedOptions: MultiValue<Option>) => {
    onChange(selectedOptions as Option[])
  }

  if (!isMounted) {
    return null // Render nothing on the server
  }

  return (
    <Select
      isMulti
      options={options}
      value={selectedTime}
      onChange={handleChange}
      components={{ Option: CheckboxOption }}
      placeholder='This food can be eaten for ...?'
      blurInputOnSelect={false}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      name='TOD'
    />
  )
}

export default TODDropdown
