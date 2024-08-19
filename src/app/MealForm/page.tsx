'use client'

import React, { useState } from 'react'
import MultiSelectDropdown, { Option1 } from '../components/Dropdown/MoodDropdown'
import TODDropdown, { Option } from '../components/Dropdown/TimeDropdown'
import toast from 'react-hot-toast'

export default function Form() {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<Option[]>([])
  const [selectedMood, setSelectedMood] = useState<Option1[]>([])

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case 'name':
        setName(e.target.value)
        break
      case 'description':
        setDescription(e.target.value)
        break
      default:
        break
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) {
      toast.error('Please select a file.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('TOD', selectedTime.map(option => option.value).join(','))
      formData.append('mood', selectedMood.map(option => option.value).join(','))

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error(await res.text())

      toast.success('File uploaded and data saved successfully!')
    } catch (e: any) {
      console.error(e)
      toast.error('An error occurred while uploading the file.')
    }
  }

  return (
    <div className="flex h-screen  w-full items-center justify-center">
      <form onSubmit={onSubmit} className="flex flex-col justify-center gap-5 border p-10">
        <input
          type="file"
          name="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />

        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="h-[40px] border text-black"
            value={name}
            type="text"
            id="name"
            name="name"
            onChange={handleChange('name')}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <input
            className="h-[40px] border text-black"
            value={description}
            type="text"
            id="description"
            name="description"
            onChange={handleChange('description')}
            required
          />
        </div>

        <div className="flex flex-col text-black">
          <TODDropdown selectedTime={selectedTime} onChange={setSelectedTime} />
        </div>

        <div className="flex flex-col text-black">
          <MultiSelectDropdown selectedMood={selectedMood} onChange={setSelectedMood} />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  )
}
