import './App.css'

function App() {
  const sensors = [
    { location: 'Living Room', value: '21.4', unit: '°C' },
    { location: 'Server Rack', value: '25.0', unit: '°C' },
    { location: 'Warehouse', value: '23.3', unit: '%RH' },
    { location: 'Cold Storage', value: '25.0', unit: '°C' }
  ]

  return (
    <div className="app-container">
      <header className="header">
        <h1>SensorGrid</h1>
        <p className="subtitle">Live facility monitoring</p>
      </header>
      
      <main className="sensor-grid">
        {sensors.map((sensor, index) => (
          <div key={index} className="sensor-card">
            <h2 className="sensor-location">{sensor.location}</h2>
            <div className="sensor-value">
              <span className="value">{sensor.value}</span>
              <span className="unit">{sensor.unit}</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App
