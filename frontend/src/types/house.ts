export interface HouseFormData {
  MedInc: number
  HouseAge: number
  AveRooms: number
  AveBedrms: number
  Population: number
  AveOccup: number
  Latitude: number
  Longitude: number
}

export type HouseFormValues = Record<
  keyof HouseFormData,
  string
>

export type FormErrors = Partial<
  Record<keyof HouseFormValues, string>
>

export interface PredictionResponse {
  predicted_price: number
  currency: string
}

export type PredictionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: PredictionResponse }
  | { status: 'error'; message: string }