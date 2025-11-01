const axios = require('axios');
const City = require('../models/City');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CHACHE_DURATION_MS = 5*60*1000;

const fetchWeatherData = async (cityCode) => {
    const url = '${OPENWEATHER_BASE_URL}?id=${cityCode}&appid=${OPENWEATHER_API_KEY}&units=metric';
    try {
        const response = await axios.get(url);

        const apiData = response.data;
        const processedData = {
            name: apiData.name,
            description: apiData.weather[0].description,
            temp: apiData.main.temp,
            tempMin: apiData.main.temp_min,
            tempMax: apiData.main.temp_max,
            pressure: apiData.main.pressure,
            humidity: apiData.main.humidity,
            visibility: apiData.visibility /  1000,
            wind: apiData.wind,
            sys: apiData.sys,
        };
        return processedData;

        } catch (error) {
            console.error('Error fetching weather for CityCode ${cityCode}:',error.message)
            return null;
    }
};

const getWeather = async (req, res) => {
    try{
        const cities = await City.find({}).sort({ CityName: 1 });
        const weatherPromises = [];

        for (const city of cities) {
            const isCacheExpired = !city.LastFetched || (new Date() - new Date(city.LastFetched)) > CACHE_DURATION_MS;

            if (isCacheExpired) {
                const fetchPromise = fetchWeatherData(city.CityCode)
                .then(apiData => {
                    if (apiData) {
                        city.LastFetched = new Date();
                        city.WeatherData = apiData;
                        city.save();
                        return apiData;
                    }
                    return city.WeatherData || {};
                });
                weatherPromises.push(fetchPromise);
            } else {
                weatherPromises.push(Promise.resolve(city.WeatherData));
            }
        }

        const finalWeatherResults = await Promise.all(weatherPromises);

        const responseData = cities.map((city, index) => ({
            CityCode: city.CityCode,
            CityName: city.CityName,
            WeatherData: finalWeatherResults[index],
        }));

        res.json(responseData);

    } catch (err) {
        console.error('Error fetching weather data:', err.message);
        res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
};

module.exports = {
    getWeather, 
}
