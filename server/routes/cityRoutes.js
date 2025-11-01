const express = require("express");

const { 
    getWeather
    } = require("../controllers/weatherController");

const router = express.Router();

//GET all city codes
router.get("/", getWeather);

module.exports = router;
