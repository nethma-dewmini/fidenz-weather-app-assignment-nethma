import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>weather app</h1>
      <p>fetching weather data...</p>
    </div>
  )
}

export default App
