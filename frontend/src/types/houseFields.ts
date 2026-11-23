import type { HouseFormData } from './house'

export interface HouseField {
  name: keyof HouseFormData
  label: string
  description: string
  placeholder: string
  step: number
  min?: number
  max?: number
}

export const houseFields: HouseField[] = [
  {
    name: 'MedInc',
    label: 'Median Income',
    description: 'Median income for the block group',
    placeholder: 'Example: 8.3252',
    step: 0.0001,
    min: 0,
  },
  {
    name: 'HouseAge',
    label: 'House Age',
    description: 'Median house age in years',
    placeholder: 'Example: 41',
    step: 0.1,
    min: 0,
  },
  {
    name: 'AveRooms',
    label: 'Average Rooms',
    description: 'Average number of rooms',
    placeholder: 'Example: 6.984',
    step: 0.0001,
    min: 0,
  },
  {
    name: 'AveBedrms',
    label: 'Average Bedrooms',
    description: 'Average number of bedrooms',
    placeholder: 'Example: 1.023',
    step: 0.0001,
    min: 0,
  },
  {
    name: 'Population',
    label: 'Population',
    description: 'Block group population',
    placeholder: 'Example: 322',
    step: 1,
    min: 0,
  },
  {
    name: 'AveOccup',
    label: 'Average Occupancy',
    description: 'Average household occupancy',
    placeholder: 'Example: 2.555',
    step: 0.0001,
    min: 0,
  },
  {
    name: 'Latitude',
    label: 'Latitude',
    description: 'Geographical latitude',
    placeholder: 'Example: 37.88',
    step: 0.0001,
    min: -90,
    max: 90,
  },
  {
    name: 'Longitude',
    label: 'Longitude',
    description: 'Geographical longitude',
    placeholder: 'Example: -122.23',
    step: 0.0001,
    min: -180,
    max: 180,
  },
]