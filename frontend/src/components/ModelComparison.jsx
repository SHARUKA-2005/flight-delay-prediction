import MetricsCard from './MetricsCard.jsx'
import MetricsChart from './MetricsChart.jsx'

function toRows(metrics) {
  return metrics.map((item) => ({
    name: item.Model,
    precision: item.Precision,
    recall: item.Recall,
    f1_score: item['F1 Score'],
    roc_auc: item['ROC-AUC'],
    accuracy: item.Accuracy,
    pr_auc: item['PR-AUC']
  }))
}

function toChartData(rows, key) {
  return rows.map((row) => ({
    name: shortName(row.name),
    value: row[key]
  }))
}

function shortName(name) {
  const map = {
    'Logistic Regression': 'LR',
    'Random Forest': 'RF',
    'Extra Trees': 'ET',
    XGBoost: 'XGB'
  }

  return map[name] || name
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`
}

export default function ModelComparison({ comparison }) {
  if (!comparison) return null

  const rows = toRows(comparison.metrics)

  const bestModel = comparison.best_model

  const bestMetrics = rows.find(
    (row) => row.name === bestModel
  )

  return (
    <div>
      <div className="terminal">
        <div className="terminal-header">
          <span className="terminal-dot" />
          <span>Model Comparison</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1</th>
                <th>ROC-AUC</th>
                <th>Accuracy</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.name}
                  className={
                    row.name === bestModel
                      ? 'best-row'
                      : ''
                  }
                >
                  <td>{row.name}</td>
                  <td>{formatPercent(row.precision)}</td>
                  <td>{formatPercent(row.recall)}</td>
                  <td>{formatPercent(row.f1_score)}</td>
                  <td>{formatPercent(row.roc_auc)}</td>
                  <td>{formatPercent(row.accuracy)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {bestMetrics && (
        <div style={{ marginTop: '24px' }}>
          <div className="eyebrow">Best Model</div>

          <div
            style={{ marginTop: '16px' }}
            className="metrics-grid"
          >
            <MetricsCard
              label="Model"
              value={bestModel}
              highlight
            />

            <MetricsCard
              label="ROC-AUC"
              value={formatPercent(bestMetrics.roc_auc)}
              highlight
            />

            <MetricsCard
              label="Accuracy"
              value={formatPercent(bestMetrics.accuracy)}
              highlight
            />

            <MetricsCard
              label="F1 Score"
              value={formatPercent(bestMetrics.f1_score)}
              highlight
            />
          </div>
        </div>
      )}

      <div
        style={{ marginTop: '24px' }}
        className="charts-grid"
      >
        <MetricsChart
          title="Precision Comparison"
          data={toChartData(rows, 'precision')}
        />

        <MetricsChart
          title="Recall Comparison"
          data={toChartData(rows, 'recall')}
        />

        <MetricsChart
          title="F1 Comparison"
          data={toChartData(rows, 'f1_score')}
        />

        <MetricsChart
          title="ROC-AUC Comparison"
          data={toChartData(rows, 'roc_auc')}
        />
      </div>
    </div>
  )
}