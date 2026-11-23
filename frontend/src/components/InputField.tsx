import type { ChangeEvent } from 'react'

interface InputFieldProps {
  name: string
  label: string
  description: string
  value: string
  placeholder: string
  step: number
  min?: number
  max?: number
  error?: string
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void
}

function InputField({
  name,
  label,
  description,
  value,
  placeholder,
  step,
  min,
  max,
  error,
  onChange,
}: InputFieldProps) {
  const inputId = `house-${name}`
  const errorId = `${inputId}-error`

  return (
    <div className="form-field">
      <label htmlFor={inputId}>
        {label}
      </label>

      <p className="field-description">
        {description}
      </p>

      <input
        id={inputId}
        name={name}
        type="number"
        value={value}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />

      {error && (
        <p
          id={errorId}
          className="field-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default InputField