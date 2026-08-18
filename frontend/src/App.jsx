import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Prediction from './pages/Prediction.jsx'
import ModelPerformance from './pages/ModelPerformance.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Prediction />} />
        <Route path="/performance" element={<ModelPerformance />} />
      </Routes>
      <footer className="footer">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>FLIGHT DELAY PREDICTION</span>
          <span>POWERED BY XGBOOST</span>
        </div>
      </footer>
    </div>
  )
}