import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiFog,
  WiDayCloudy,
  WiNightClear,
  WiShowers,
} from "react-icons/wi";
import { TbNavigationFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

// Helper functions
const formatTime = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getWindDirection = (deg) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((deg % 360) / 45);
  return directions[index % 8];
};

// Get weather icon based on description
const getWeatherIcon = (description) => {
  if (!description) return <WiCloudy className="text-5xl" />;
  const desc = description.toLowerCase();

  if (desc.includes("clear")) return <WiDaySunny className="text-5xl" />;
  if (desc.includes("few clouds")) return <WiDayCloudy className="text-5xl" />;
  if (desc.includes("broken") || desc.includes("scattered"))
    return <WiCloudy className="text-5xl" />;
  if (desc.includes("cloud")) return <WiCloudy className="text-5xl" />;
  if (desc.includes("rain") || desc.includes("drizzle"))
    return <WiRain className="text-5xl" />;
  if (desc.includes("shower")) return <WiShowers className="text-5xl" />;
  if (desc.includes("snow")) return <WiSnow className="text-5xl" />;
  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze"))
    return <WiFog className="text-5xl" />;

  return <WiCloudy className="text-5xl" />;
};

// Get card gradient based on city name
const getCardGradient = (cityName) => {
  const city = cityName.toLowerCase();
  if (city.includes("colombo")) return "from-blue-400 to-blue-600";
  if (city.includes("tokyo")) return "from-purple-500 to-purple-700";
  if (city.includes("liverpool")) return "from-green-400 to-green-600";
  if (city.includes("sydney")) return "from-orange-400 to-orange-600";
  if (city.includes("boston")) return "from-red-400 to-red-600";
  return "from-blue-500 to-blue-700";
};

const WeatherCard = ({ cityData, onRemove }) => {
  const { CityName, CityCode, Weather } = cityData;
  if (!Weather || Object.keys(Weather).length === 0) {
    return (
      <div className="bg-red-800 rounded-lg p-6 shadow-lg text-center">
        No weather data for {CityName}
      </div>
    );
  }
  const {
    temp,
    description,
    tempMin,
    tempMax,
    pressure,
    humidity,
    visibility,
    wind,
    sys,
  } = Weather;

  // Dynamic background gradient based on city
  const backgroundClass = getCardGradient(CityName);

  // Get weather icon
  const weatherIcon = getWeatherIcon(description);

  // Current time and date
  const now = new Date();
  const displayTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const displayDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 flex flex-col h-full">
      {/* Top Colored Section  */}
      <div
        className={`bg-gradient-to-br ${backgroundClass} text-white p-6 relative`}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove?.(CityCode);
          }}
          className="absolute top-3 right-3 text-white text-3xl opacity-70 hover:opacity-100 transition-opacity"
        >
          <IoMdClose />
        </button>

        {/* City Name and Time */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            {CityName}, {sys?.country || "LK"}
          </h3>
          <p className="text-sm opacity-80">
            {displayTime}, {displayDate}
          </p>
        </div>

        {/* Weather Display */}
        <div className="flex items-start justify-between">
          {/* Left side: Icon and Description */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {weatherIcon}
              <span className="text-lg font-medium">{description}</span>
            </div>
          </div>

          {/* Right side: Temperature */}
          <div className="text-right">
            <div className="text-6xl font-light leading-none mb-2">
              {Math.round(temp)}°C
            </div>
            <div className="text-sm opacity-90">
              <p>Temp Min: {Math.round(tempMin)}°C</p>
              <p>Temp Max: {Math.round(tempMax)}°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dark Section */}
      <div className="bg-gray-800 text-white p-6 flex-grow">
        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
          <div>
            <p className="font-semibold">Pressure:</p>
            <p className="opacity-90">{pressure}hPa</p>
          </div>
          <div>
            <p className="font-semibold">Humidity:</p>
            <p className="opacity-90">{humidity}%</p>
          </div>
          <div>
            <p className="font-semibold">Visibility:</p>
            <p className="opacity-90">{visibility?.toFixed(1)}km</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <TbNavigationFilled
              className="text-lg"
              style={{ transform: `rotate(${wind?.deg || 0}deg)` }}
            />
            <span>
              {wind?.speed?.toFixed(1)}m/s {wind?.deg}°{" "}
              {getWindDirection(wind?.deg)}
            </span>
          </div>
          <div className="text-right text-xs">
            <p>
              <span className="font-semibold">Sunrise:</span>{" "}
              {formatTime(sys?.sunrise)}
            </p>
            <p>
              <span className="font-semibold">Sunset:</span>{" "}
              {formatTime(sys?.sunset)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
