import type { PredictionResponse } from '../types/house'

interface PredictionResultProps {
  prediction: PredictionResponse
}

function PredictionResult({
  prediction,
}: PredictionResultProps) {
  const formattedPrice = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: prediction.currency,
      maximumFractionDigits: 2,
    }
  ).format(prediction.predicted_price)

  return (
    <section className="prediction-result">
      <p className="result-eyebrow">
        Estimated House Value
      </p>

      <h2>{formattedPrice}</h2>

      <p className="result-description">
        This value is a machine learning estimate,
        not an official property valuation.
      </p>
    </section>
  )
}

export default PredictionResult