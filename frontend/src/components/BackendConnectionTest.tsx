
import { useState } from 'react'
import { checkBackendHealth } from '../services/api'

function BackendConnectionTest() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function handleCheckConnection() {
    setStatus('loading')
    setMessage('Checking backend connection...')

    try {
      await checkBackendHealth()

      setStatus('success')
      setMessage('Backend connection successful!')
    } catch {
      setStatus('error')
      setMessage(
        'Cannot connect to backend. Check your server.'
      )
    }
  }

  return (
    <section>
      <h2>Backend Connection</h2>

      <button
        type="button"
        onClick={handleCheckConnection}
        disabled={status === 'loading'}
      >
        {status === 'loading'
          ? 'Checking...'
          : 'Check Backend Connection'}
      </button>

      <p role="status">{message}</p>
    </section>
  )
}

export default BackendConnectionTest
