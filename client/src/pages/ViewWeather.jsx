import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiFog, 
  WiDayCloudy,
  WiShowers
} from 'react-icons/wi';
import { TbNavigationFilled } from 'react-icons/tb';
import { IoArrowBack } from 'react-icons/io5';

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

// Get weather icon based on description
const getWeatherIcon = (description) => {
  if (!description) return <WiCloudy className="text-8xl" />;
  const desc = description.toLowerCase();
  
  if (desc.includes('clear')) return <WiDaySunny className="text-8xl" />;
  if (desc.includes('few clouds')) return <WiDayCloudy className="text-8xl" />;
  if (desc.includes('broken') || desc.includes('scattered')) return <WiCloudy className="text-8xl" />;
  if (desc.includes('cloud')) return <WiCloudy className="text-8xl" />;
  if (desc.includes('rain') || desc.includes('drizzle')) return <WiRain className="text-8xl" />;
  if (desc.includes('shower')) return <WiShowers className="text-8xl" />;
  if (desc.includes('snow')) return <WiSnow className="text-8xl" />;
  if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return <WiFog className="text-8xl" />;
  
  return <WiCloudy className="text-8xl" />;
};

// Get card gradient based on city name
const getCardGradient = (cityName) => {
  const city = cityName.toLowerCase();
  if (city.includes('colombo')) return 'from-blue-400 to-blue-600';
  if (city.includes('tokyo')) return 'from-purple-500 to-purple-700';
  if (city.includes('liverpool')) return 'from-green-400 to-green-600';
  if (city.includes('sydney')) return 'from-orange-400 to-orange-600';
  if (city.includes('boston')) return 'from-red-400 to-red-600';
  return 'from-blue-500 to-blue-700';
};

const ViewWeather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cityData } = location.state || {};

  if (!cityData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-gray-900 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-xl mb-4">No city data found. Please go back to the dashboard.</p>
          <button 
            onClick={() => navigate('/')} 
            className="p-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
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
  
  const weatherIcon = getWeatherIcon(description);
  const backgroundClass = getCardGradient(CityName);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 relative">
          <button 
            onClick={() => navigate(-1)}
            className="absolute left-0 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <IoArrowBack className="text-3xl" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <WiDaySunny className="text-5xl text-yellow-300 absolute" style={{ top: '-8px', left: '-4px' }} />
              <WiCloudy className="text-3xl text-purple-300 absolute" style={{ bottom: '-4px', right: '-4px' }} />
            </div>
            <h1 className="text-3xl font-normal ml-2">Weather App</h1>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="rounded-xl shadow-2xl overflow-hidden">
          {/* Top Colored Section */}
          <div className={`bg-gradient-to-br ${backgroundClass} p-12 text-white`}>
            <div className="text-center">
              {/* City and Time */}
              <h2 className="text-4xl font-semibold mb-2">
                {CityName}, {sys?.country || 'LK'}
              </h2>
              <p className="text-lg opacity-90 mb-12">
                {displayTime}, {displayDate}
              </p>
              
              {/* Weather Display */}
              <div className="flex items-center justify-center gap-16">
                {/* Icon and Description */}
                <div className="flex flex-col items-center border-r border-white/30 pr-16">
                  {weatherIcon}
                  <span className="text-xl font-medium mt-3">{description}</span>
                </div>
                
                {/* Temperature */}
                <div className="text-left">
                  <div className="text-8xl font-light leading-none mb-3">
                    {Math.round(temp)}°C
                  </div>
                  <div className="text-lg">
                    <p>Temp Min: {Math.round(tempMin)}°C</p>
                    <p>Temp Max: {Math.round(tempMax)}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dark Section */}
          <div className="bg-gray-800 p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base">
              {/* Column 1 - Pressure, Humidity, Visibility */}
              <div className="space-y-2">
                <p><span className="font-semibold">Pressure:</span> {pressure}hPa</p>
                <p><span className="font-semibold">Humidity:</span> {humidity}%</p>
                <p><span className="font-semibold">Visibility:</span> {visibility?.toFixed(1)}km</p>
              </div>

              {/* Column 2 - Wind */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3 text-lg">
                  <TbNavigationFilled 
                    className="text-3xl" 
                    style={{ transform: `rotate(${wind?.deg || 0}deg)` }} 
                  />
                  <div>
                    <p className="text-2xl font-semibold">
                      {wind?.speed?.toFixed(1)}m/s {wind?.deg}° {getWindDirection(wind?.deg)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 3 - Sunrise/Sunset */}
              <div className="space-y-2 md:text-right">
                <p><span className="font-semibold">Sunrise:</span> {formatTime(sys?.sunrise)}</p>
                <p><span className="font-semibold">Sunset:</span> {formatTime(sys?.sunset)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm py-10">
          2021 Fidenz Technologies
        </footer>
      </div>
    </div>
  );
};

export default ViewWeather;