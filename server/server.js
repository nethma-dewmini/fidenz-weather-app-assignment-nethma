require('dotenv').config();

const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');


// express app
const app = express()

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// read and parse city codes
function getCityCodes() {
    try{
        const filePath = path.join(__dirname, 'cities.json')
        const data = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(data);
        const cityCodes = parsed.List.map(city => city.CityCode);
        return cityCodes;
    } catch (error) {
        console.error('Error in cities.json:', error);
        return [];
    }
}

let cache = {};
const CACHE_DURATION = 5 * 60 * 1000;

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'server is running'});
})

app.get('/api/citycodes', (req,res) => {
    const cityCodes = getCityCodes();
    res.json(cityCodes);
})

app.get('/api/weather/:cityId', async (req, res) => {
    const cityId = req.params.cityId;
    const cacheKey = cityId;
    const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
        console.log('Serving from cache');
        return res.json(cache[cacheKey].data);
    }
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`
        );

        const { name, weather, main } = response.data;
        const result = {
            name,
            description: weather[0].description,
            temperature: main.temp,
        };

        cache[cacheKey] = {
            data: result,
            timestamp: now,
        };

        console.log('Fetched from API');
        res.json(result);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});


// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})