import ProbabilityCard from './ProbabilityCard.jsx'

function FlapNumber({ value }) {
  const text = `${value}%`
  return (
    <span className="flap-row">
      {text.split('').map((char, index) => (
        <span key={index} className="flap-char" style={{ animationDelay: `${index * 0.05}s` }}>
          {char}
        </span>
      ))}
    </span>
  )
}

export default function PredictionResult({ result }) {
  if (!result) return null

  const delayed = result.prediction === 1
  const percent = Math.round(result.probability * 100)

  return (
    <div>
      <div className="result-card">
        <div className={`result-badge ${delayed ? 'delayed' : 'on-time'}`}>
          <span className="result-badge-dot" />
          {delayed ? 'Delayed' : 'On Time'}
        </div>

        <div className={`result-flap ${delayed ? 'delayed' : 'on-time'}`}>
          <FlapNumber value={percent} />
        </div>
        <div className="result-label">Probability of Delay</div>

        <div className="result-model">
          Model used: <strong>{result.model}</strong>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <ProbabilityCard probability={result.probability} delayed={delayed} />
      </div>
    </div>
  )
}