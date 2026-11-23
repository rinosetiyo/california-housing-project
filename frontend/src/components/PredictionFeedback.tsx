import type { PredictionState } from '../types/house'
import PredictionResult from './PredictionResult'

interface PredictionFeedbackProps {
  state: PredictionState
}

function PredictionFeedback({
  state,
}: PredictionFeedbackProps) {
  if (state.status === 'idle') {
    return (
      <div className="feedback feedback-idle">
        Complete the form to estimate a house value.
      </div>
    )
  }

  if (state.status === 'loading') {
    return (
      <div
        className="feedback feedback-loading"
        role="status"
      >
        <span className="loading-spinner" />
        <span>Predicting house price...</span>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div
        className="feedback feedback-error"
        role="alert"
      >
        <strong>Prediction failed</strong>
        <p>{state.message}</p>
      </div>
    )
  }

  return (
    <PredictionResult prediction={state.data} />
  )
}

export default PredictionFeedback