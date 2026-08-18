import { useEffect, useState } from 'react'
import ModelComparison from '../components/ModelComparison.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getComparison } from '../services/api.js'

export default function ModelPerformance() {
  const [comparison, setComparison] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadComparison() {
      setLoading(true)
      setError(null)
      try {
        const data = await getComparison()
        if (isMounted) setComparison(data)
      } catch (err) {
        if (isMounted) setError(err.message || 'Could not load model performance data.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadComparison()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Radar Room</div>
          <h1 className="section-title">Model Performance</h1>
          <p className="section-sub">
            Three models were trained and tested on the same historical flight data.
            Here is how each one holds up against the others.
          </p>
        </div>

        {loading && <Loading label="Pulling model metrics" />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && comparison && <ModelComparison comparison={comparison} />}
      </div>
    </main>
  )
}