import type {
  FormErrors,
  HouseFormValues,
} from '../types/house'

export function validateHouseForm(
  values: HouseFormValues
): FormErrors {
  const errors: FormErrors = {}

  const requiredPositiveFields = [
    'MedInc',
    'AveRooms',
    'AveBedrms',
    'AveOccup',
  ] as const

  const requiredNonNegativeFields = [
    'HouseAge',
    'Population',
  ] as const

  for (const field of Object.keys(values) as Array<
    keyof HouseFormValues
  >) {
    const rawValue = values[field].trim()

    if (rawValue === '') {
      errors[field] = 'This field is required.'
      continue
    }

    const value = Number(rawValue)

    if (!Number.isFinite(value)) {
      errors[field] = 'Please enter a valid number.'
    }
  }

  for (const field of requiredPositiveFields) {
    const value = Number(values[field])

    if (
      values[field].trim() !== '' &&
      Number.isFinite(value) &&
      value <= 0
    ) {
      errors[field] = 'Value must be greater than zero.'
    }
  }

  for (const field of requiredNonNegativeFields) {
    const value = Number(values[field])

    if (
      values[field].trim() !== '' &&
      Number.isFinite(value) &&
      value < 0
    ) {
      errors[field] = 'Value cannot be negative.'
    }
  }

  const latitude = Number(values.Latitude)

  if (
    values.Latitude.trim() !== '' &&
    Number.isFinite(latitude) &&
    (latitude < -90 || latitude > 90)
  ) {
    errors.Latitude = 'Latitude must be between -90 and 90.'
  }

  const longitude = Number(values.Longitude)

  if (
    values.Longitude.trim() !== '' &&
    Number.isFinite(longitude) &&
    (longitude < -180 || longitude > 180)
  ) {
    errors.Longitude = 'Longitude must be between -180 and 180.'
  }

  return errors
}