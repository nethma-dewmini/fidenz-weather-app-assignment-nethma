require('dotenv').config();

const express = require('express');
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

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'server is running'});
})

app.get('/api/citycodes', (req,res) => {
    const cityCodes = getCityCodes();
    res.json(cityCodes);
})

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})