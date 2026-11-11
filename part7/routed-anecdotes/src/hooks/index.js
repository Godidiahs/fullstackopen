import { useState } from 'react'

// Full Stack Open Part 7, exercises 7.7-7.8
// Custom hook for form fields. Returns the props to
// spread onto an input (type, value, onChange) plus a
// reset function. Spreading only `input` onto the input
// keeps `reset` out of the DOM element.

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    input: {
      type,
      value,
      onChange,
    },
    value,
    reset,
  }
}
