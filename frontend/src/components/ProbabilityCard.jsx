export default function ProbabilityCard({ probability, delayed }) {
  const percent = Math.round(probability * 100)
  const color = delayed ? 'var(--red)' : 'var(--green)'

  return (
    <div className="prob-card">
      <div className="eyebrow">Probability of Delay</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', fontWeight: 600, color }}>
          {percent}%
        </span>
      </div>
      <div className="prob-track">
        <div className="prob-fill" style={{ width: `${percent}%`, background: color }} />
      </div>
    </div>
  )
}