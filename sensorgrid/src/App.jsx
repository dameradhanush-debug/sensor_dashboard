import { useEffect, useState } from 'react'
import './App.css'

const getWaterStatus = (percentage) => {
  if (percentage < 30) return 'LOW'
  if (percentage <= 80) return 'NORMAL'
  return 'HIGH'
}

function SensorCard({ label, value, unit, status, detail, accent = 'teal' }) {
  return (
    <article className={`sensor-card sensor-card--${accent}`}>
      <div className="card-heading">
        <span className="sensor-dot" aria-hidden="true" />
        <span>{label}</span>
        {status && <span className={`status status--${status.toLowerCase()}`}>{status}</span>}
      </div>
      <div className="sensor-reading">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <p>{detail}</p>
    </article>
  )
}

function App() {
  const [waterLevel, setWaterLevel] = useState(62)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWaterLevel((currentLevel) => {
        const nextLevel = currentLevel + (Math.random() * 6 - 3)
        return Math.min(96, Math.max(12, Number(nextLevel.toFixed(1))))
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const status = getWaterStatus(waterLevel)
  const distance = (100 - waterLevel).toFixed(1)

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">SENSORGRID / FIELD NODE 01</p>
          <h1>Water level monitoring</h1>
          <p className="intro">Live telemetry from an ESP32 and HC-SR04 ultrasonic sensor.</p>
        </div>
        <div className="connection-state"><span /> SIMULATION ONLINE</div>
      </header>

      <section className="overview" aria-label="Water level overview">
        <div className="level-panel">
          <div className="level-panel__topline"><span>Current tank level</span><span>Updated every 1s</span></div>
          <div className="level-value"><strong>{waterLevel.toFixed(1)}</strong><span>%</span></div>
          <div className="level-track"><div className="level-fill" style={{ width: `${waterLevel}%` }} /></div>
          <div className="level-scale"><span>0% empty</span><span>100% full</span></div>
        </div>
        <div className="status-panel">
          <span className="status-panel__label">System status</span>
          <strong className={`large-status large-status--${status.toLowerCase()}`}>{status}</strong>
          <p>{status === 'LOW' ? 'Refill threshold reached.' : 'Within monitored operating range.'}</p>
        </div>
      </section>

      <section className="sensor-grid" aria-label="Sensor readings">
        <SensorCard label="Water level" value={waterLevel.toFixed(1)} unit="%" status={status} detail="Calculated tank fill percentage" accent="teal" />
        <SensorCard label="Ultrasonic distance" value={distance} unit="cm" detail="HC-SR04 surface distance" accent="amber" />
        <SensorCard label="Tank capacity" value="100" unit="cm" detail="Configured tank height" accent="coral" />
      </section>

      <footer className="dashboard-footer"><span>ESP32 / HC-SR04</span><span>Last sample: now</span></footer>
    </main>
  )
}

export default App
