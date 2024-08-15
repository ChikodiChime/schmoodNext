'use client'
import React, { useState, useLayoutEffect } from 'react'
import Select, { components, MultiValue } from 'react-select'

export interface Option1 {
  value: string
  label: string
}

const options: Option1[] = [
  { value: 'Happy', label: 'Happy' },
  { value: 'Sad', label: 'Sad' },
  { value: 'Angry', label: 'Angry' },
  { value: 'Sick', label: 'Sick' },
  { value: 'Relaxed', label: 'Relaxed' },
  { value: 'Heart Broken', label: 'Heart Broken' },
  { value: 'Lovey Dovey', label: 'Lovey Dovey' },
  { value: 'Excited', label: 'Excited' },
  { value: 'Starving', label: 'Starving' },
  { value: 'Anxious', label: 'Anxious' },
  { value: 'Stressed', label: 'Stressed' },
  { value: 'Sweet Toothed', label: 'Sweet Toothed' },
  { value: 'Rich', label: 'Rich' },
  { value: 'Broke', label: 'Broke' },
  // Add more options as needed
]

const CheckboxOption: React.FC<any> = (props) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => {}} style={{ marginRight: 10 }} />
      {props.label}
    </components.Option>
  );
};

interface MultiSelectDropdownProps {
  selectedMood: Option1[];
  onChange: (selectedOptions: Option1[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ selectedMood, onChange }) => {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (selectedOptions: MultiValue<Option1>) => {
    onChange(selectedOptions as Option1[]);
  };

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
    <Select
      isMulti
      options={options}
      value={selectedMood}
      onChange={handleChange}
      components={{ Option: CheckboxOption }}
      placeholder='This food can be eaten when you are...?'
      blurInputOnSelect={false}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      name='mood'
    />
  )
}

export default MultiSelectDropdown
