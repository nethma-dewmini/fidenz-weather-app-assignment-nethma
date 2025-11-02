import React from 'react';


// Helper functions
const formatTime = (timestamp) => {
    if(!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true})
}

const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'SW', 'W', 'NW'];
    const index = Math.round((deg % 360) /45);
    return directions[index % 8];
}

const getCardStyle = (description) => {
    if (!description) return 'from-blue-500 to-blue-700';
    const desc = description.toLowerCase();
    if(desc.includes('clear')){
        return 'from-orange-400 to-orange-600';
    }
    if (desc.includes('rain')){
        return 'from-red-500 to-purple-600';
    }
    if (desc.includes('mist') ){
        return 'from-gray-500 to-gray-700';
    }
    return 'from-blue-500 to-blue-700';
    }

    const WeatherCard = ({cityData}) => {
        const { CityName, Weather} = cityData;
        if(!Weather || Object.keys(Weather).length === 0){
            return (
                <div className="bg-red-800 rounded-lg p-6 shadow-lg text-center">
                    No weather data for {CityName}
                </div>
            )
        }
        const {
            temp, description, tempMin, tempMax, pressure, humidity, visibility, wind, sys
        } = Weather;

        // Dynamic background class
        const backgroundClass = getCardStyle(description);

        // Current time and date
        const now = new Date();
        const displayTime = now.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
        const displayDate = now.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});

        return (
          <div className={`weather-card bg-gradient-to-br ${backgroundClass} rounded-lg p-6 shadow-lg flex flex-col justify-between min-h-[380px] transition-transform duration-200 hover:scale-105 h-full`}>
      
      <div className="card-header flex justify-between items-start border-b border-white/10 pb-4">
        <div>
          <span className="city-name text-2xl font-semibold">{CityName.toUpperCase()}, {sys?.country || 'LK'}</span>
          <p className="time-date text-sm opacity-70">{displayTime}, {displayDate}</p>
        </div>
        <span className="close-btn text-3xl font-light opacity-50 cursor-pointer">&times;</span>
      </div>

            <div className="card-main-info flex-grow flex flex-col justify-center py-5">
        <div className="flex items-center">
          <span className="weather-icon text-5xl mr-4">☁️</span> {/* Placeholder Icon */}
          <span className="temperature text-6xl font-light">{Math.round(temp)}°C</span>
        </div>
        <div className="temp-range text-sm opacity-90 mt-2 ml-1">
          <p>Temp Min: {Math.round(tempMin)}°C</p>
          <p>Temp Max: {Math.round(tempMax)}°C</p>
        </div>
        <p className="condition text-xl font-medium mt-4">{description.toUpperCase()}</p>
      </div>
                  <div className="card-footer-details pt-4 border-t border-white/10 text-sm leading-relaxed">
        <div className="detail-row flex justify-between">
          <p><strong>Pressure:</strong> {pressure}hPa</p>
          <p><strong>Humidity:</strong> {humidity}%</p>
          <p><strong>Visibility:</strong> {visibility?.toFixed(1)}km</p>
        </div>
        <div className="detail-row flex justify-between mt-2">
          <p className="wind-speed">{wind?.speed.toFixed(1)}m/s {wind?.deg}° {getWindDirection(wind?.deg)}</p>
          <div className="sun-times text-right">
            <p>Sunrise: {formatTime(sys?.sunrise)}</p>
            <p>Sunset: {formatTime(sys?.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
        )
    }
 
export default WeatherCard;