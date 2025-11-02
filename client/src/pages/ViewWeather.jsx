import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const formatTime = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const getWindDirection = (deg) => {
  if (deg === undefined) return 'N/A';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((deg % 360) / 45);
  return directions[index % 8];
};

const ViewWeather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the data passed from the Dashboard's <Link>
  const { cityData } = location.state || {};

  if (!cityData) {
    return (
      <div className="text-center p-10">
        <p>No city data found. Please go back to the dashboard.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 p-2 px-4 bg-purple-600 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { CityName, Weather } = cityData;
  const {
    temp, description, tempMin, tempMax,
    pressure, humidity, visibility, wind, sys
  } = Weather;

  const now = new Date();
  const displayTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const displayDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header outside the card */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-light">Weather App</h2>
        <button 
          onClick={() => navigate(-1)} // Go back to the previous page
          className="text-lg p-2 px-4 bg-gray-700 rounded-md hover:bg-gray-600"
        >
          &larr; Back
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        
        {/* Top Blue Section */}
        <div className="bg-blue-600 p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left side: City/Time */}
            <div>
              <h3 className="text-3xl font-bold">{CityName.toUpperCase()}, {sys?.country || 'LK'}</h3>
              <p className="text-lg opacity-80">{displayTime}, {displayDate}</p>
            </div>
            
            {/* Right side: Icon, Temp, Range */}
            <div className="flex items-center mt-6 md:mt-0">
              <span className="text-6xl mr-4">☁️</span> {/* Placeholder Icon */}
              <div>
                <p className="text-7xl font-light">{Math.round(temp)}°C</p>
                <p className="text-xl text-center opacity-90">{description.toUpperCase()}</p>
              </div>
              <div className="text-md opacity-90 ml-6">
                <p>Temp Min: {Math.round(tempMin)}°C</p>
                <p>Temp Max: {Math.round(tempMax)}°C</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Dark Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
          <div>
            <p><strong>Pressure:</strong> {pressure}hPa</p>
            <p><strong>Humidity:</strong> {humidity}%</p>
            <p><strong>Visibility:</strong> {visibility?.toFixed(1)}km</p>
          </div>
          <div>
            <p><strong>Wind:</strong> {wind?.speed.toFixed(1)}m/s {wind?.deg}° {getWindDirection(wind?.deg)}</p>
          </div>
          <div>
            <p><strong>Sunrise:</strong> {formatTime(sys?.sunrise)}</p>
            <p><strong>Sunset:</strong> {formatTime(sys?.sunset)}</p>
          </div>
        </div>

      </div>

<footer className="footer-text text-center text-gray-400 text-sm py-10">
        © 2021 Fidenz Technologies
      </footer>
    </div>
  );
};

export default ViewWeather;
