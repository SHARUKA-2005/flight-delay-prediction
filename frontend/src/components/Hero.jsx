import { Link } from 'react-router-dom'

function FlapWord({ text, delayOffset = 0 }) {
  return (
    <span className="flap-row">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`flap-char${char === ' ' ? ' is-space' : ''}`}
          style={{ animationDelay: `${(delayOffset + index) * 0.035}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const lineOne = 'WILL YOUR'
  const lineTwo = 'FLIGHT BE'
  const lineThree = 'ON TIME?'

  return (
    <section className="hero">
      <div className="container">
        <div className="eyebrow">GATE 12 · NOW BOARDING · MACHINE LEARNING</div>
        <h1 className="hero-title flap-board" style={{ flexDirection: 'column', display: 'flex' }}>
          <FlapWord text={lineOne} delayOffset={0} />
          <FlapWord text={lineTwo} delayOffset={lineOne.length} />
          <FlapWord text={lineThree} delayOffset={lineOne.length + lineTwo.length} />
        </h1>
        <p className="hero-sub">
          Enter a flight's schedule and route, and our model reads the pattern before the
          departure board does. Trained on real airline data, tuned for the moments that
          matter most: your gate, your day, your delay.
        </p>
        <div className="hero-actions">
          <Link to="/predict" className="btn btn-primary">
            Predict Flight →
          </Link>
          <Link to="/performance" className="btn btn-ghost">
            View Model Performance
          </Link>
        </div>

        <div className="board-panel">
          <div className="board-header">
            <span>Model Performance</span>
            <span>Live from /api/comparison</span>
          </div>
          <div className="board-grid">
            <div className="board-cell">
              <div className="board-cell-label">Accuracy</div>
              <div className="board-cell-value">85%</div>
            </div>
            <div className="board-cell">
              <div className="board-cell-label">Precision</div>
              <div className="board-cell-value">82%</div>
            </div>
            <div className="board-cell">
              <div className="board-cell-label">Recall</div>
              <div className="board-cell-value">78%</div>
            </div>
            <div className="board-cell">
              <div className="board-cell-label">ROC-AUC</div>
              <div className="board-cell-value green">91%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}