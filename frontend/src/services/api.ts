import type {
  HouseFormData,
  PredictionResponse,
} from '../types/house'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ??
  'http://127.0.0.1:8000'
).replace(/\/$/, '')

function extractErrorMessage(
  data: unknown,
  status: number
): string {
  if (
    typeof data === 'object' &&
    data !== null &&
    'detail' in data
  ) {
    const detail = data.detail

    if (typeof detail === 'string') {
      return detail
    }

    return JSON.stringify(detail)
  }

  return `Request failed with HTTP status ${status}.`
}

export async function checkBackendHealth(): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/health`)

  if (!response.ok) {
    throw new Error(
      `Backend health check failed: HTTP ${response.status}`
    )
  }

  return true
}

export async function predictHousePrice(
  payload: HouseFormData
): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  let data: unknown

  try {
    data = await response.json()
  } catch {
    throw new Error('Backend returned an invalid JSON response.')
  }

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(data, response.status)
    )
  }

  if (
    typeof data !== 'object' ||
    data === null ||
    !('predicted_price' in data) ||
    !('currency' in data) ||
    typeof data.predicted_price !== 'number' ||
    !Number.isFinite(data.predicted_price) ||
    typeof data.currency !== 'string'
  ) {
    throw new Error(
      'Backend response does not match the expected format.'
    )
  }

  return {
    predicted_price: data.predicted_price,
    currency: data.currency,
  }
}