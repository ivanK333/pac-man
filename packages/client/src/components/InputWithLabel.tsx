import React from 'react'
import { ValidationEntry } from '../commonTypes'
import { useFormContext } from 'react-hook-form'

export interface InputProps {
  label: string
  name: string
  id?: string
  value?: string | number
  type?: string
  placeholder?: string
  required?: boolean
  autoFocus?: boolean
  validation?: ValidationEntry
  onBlur?: () => void
}

const InputWithLabel: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  id,
  value,
  autoFocus,
  placeholder,
  validation,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext()

  return (
    <>
      <label htmlFor={name}>{label}:</label>
      <input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...register(name, validation)}
        onBlur={() => trigger(name)}
        {...rest}
      />
      {errors[name] && <p>{errors[name]?.message as string}</p>}
    </>
  )
}

export default InputWithLabel
