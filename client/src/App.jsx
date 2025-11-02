import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ViewWeather from './pages/ViewWeather.jsx'
import './App.css'

function App() {

  return (
    <div className="App min-h-screen flex flex-col items-center p-5 box-border">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather/:cityCode" element={<ViewWeather />} />
      </Routes>
    </div>
  )
}

export default App
