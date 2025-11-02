import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

import WeatherCard from "../components/WeatherCard";
import Header from "../components/Header";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
if (!isAuthenticated) {
        setLoading(false);
        return; 
    }

    const fetchData = async () => {
      try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://weather-api.fidenz.com',
        }
      });
      console.log('Access token obtained:', token ? 'Token exists' : 'No token');
      console.log('Token preview:', token ? token.substring(0, 50) + '...' : 'N/A');

        const response = await axios.get('/api/cities', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });

        if (Array.isArray(response.data)) {
          setWeatherData(response.data);
        } else {
          throw new Error("Data received was not an array.");
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load weather data. Please ensure you are logged in.");
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="dashboard-container w-full max-w-6xl">
      <Header />

      {loading && (
        <div className="text-center text-xl p-10">
          Loading weather dashboard...
        </div>
      )}
      {error && (
        <div className="text-center text-red-400 text-xl p-10">{error}</div>
      )}
      {!loading && !error && (
        <div className="weather-grid grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
          {Array.isArray(weatherData) &&
            weatherData.map((city) => (
              <Link
                key={city.CityCode}
                to={`/weather/${city.CityCode}`}
                // Pass the city data to the next page to avoid another API call
                state={{ cityData: city }}
              >
                <WeatherCard cityData={city} />
              </Link>
            ))}
        </div>
      )}

      <footer className="footer-text text-center text-gray-400 text-sm py-10">
        2021 Fidenz Technologies
      </footer>
    </div>
  );
};

export default Dashboard;
