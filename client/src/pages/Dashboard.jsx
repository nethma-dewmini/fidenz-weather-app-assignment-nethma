import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import Header from '../components/Header';

const Dashboard = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/weather');
            setWeatherData(response.data);
        }
        catch(err){
            console.error("Error fetching dashboard data:", err);
            setError("Failed to load weather data. Check server.");
        }finally {
            setLoading(false);
        }
    }
    fetchData();
}, []);

return (
    <div className="dashboard-container w-full max-w-6xl">
    <Header />

    {loading &&(
        <div className="text-center text-xl p-10">
            Loading weather dashboard...
        </div>
    )}
     {error && (
        <div className="text-center text-red-400 text-xl p-10">
            {error}
            </div>
     )}
        {!loading && !error && (
            <div className="weather-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
                {weatherData.map(city => (
                    <WeatherCard key={city.CityCode} cityData={city} />
                ))}
            </div>
        )}

        <footer className="footer-text text-center text-gray-400 text-sm py-10">
             2021 Fidenz Technologies
        </footer>
    </div>
)

}

export default Dashboard;