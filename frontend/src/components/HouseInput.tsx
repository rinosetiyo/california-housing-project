import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'

import InputField from './InputField'
import PredictionFeedback from './PredictionFeedback'

import { houseFields } from '../types/houseFields'
import { validateHouseForm } from '../utils/validateHouseForm'
import { predictHousePrice } from '../services/api'

import type {
  FormErrors,
  HouseFormData,
  HouseFormValues,
  PredictionState,
} from '../types/house'


const initialFormData: HouseFormValues = {
  MedInc: '',
  HouseAge: '',
  AveRooms: '',
  AveBedrms: '',
  Population: '',
  AveOccup: '',
  Latitude: '',
  Longitude: '',
}


function HouseInput() {
  const [formData, setFormData] =
    useState<HouseFormValues>(initialFormData)

  const [errors, setErrors] =
    useState<FormErrors>({})

  const [predictionState, setPredictionState] =
    useState<PredictionState>({ status: 'idle' })


  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target

    const fieldName = name as keyof HouseFormValues

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: value,
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: undefined,
    }))

    setPredictionState({ status: 'idle' })
  }


  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const validationErrors =
      validateHouseForm(formData)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setPredictionState({ status: 'idle' })
      return
    }

    const payload: HouseFormData = {
      MedInc: Number(formData.MedInc),
      HouseAge: Number(formData.HouseAge),
      AveRooms: Number(formData.AveRooms),
      AveBedrms: Number(formData.AveBedrms),
      Population: Number(formData.Population),
      AveOccup: Number(formData.AveOccup),
      Latitude: Number(formData.Latitude),
      Longitude: Number(formData.Longitude),
    }

    setPredictionState({ status: 'loading' })

    try {
      const result = await predictHousePrice(payload)

      setPredictionState({
        status: 'success',
        data: result,
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.'

      setPredictionState({
        status: 'error',
        message,
      })
    }
  }


  function handleReset() {
    setFormData(initialFormData)
    setErrors({})
    setPredictionState({ status: 'idle' })
  }


  return (
    <section className="prediction-card">
      <div className="card-heading">
        <div>
          <span className="section-label">
            PROPERTY ESTIMATOR
          </span>

          <h2>Enter House Information</h2>

          <p>
            Provide the eight dataset features
            to generate a price estimate.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {houseFields.map((field) => (
            <InputField
              key={field.name}
              name={field.name}
              label={field.label}
              description={field.description}
              value={formData[field.name]}
              placeholder={field.placeholder}
              step={field.step}
              min={field.min}
              max={field.max}
              error={errors[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button"
            disabled={predictionState.status === 'loading'}
          >
            {predictionState.status === 'loading'
              ? 'Predicting...'
              : 'Predict House Price'}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleReset}
            disabled={predictionState.status === 'loading'}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="prediction-feedback-container">
        <PredictionFeedback state={predictionState} />
      </div>
    </section>
  )
}

export default HouseInput