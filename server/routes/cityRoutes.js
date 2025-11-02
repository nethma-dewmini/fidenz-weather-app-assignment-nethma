const express = require("express");

const { 
    getWeather
    } = require("../controllers/weatherController");


const checkJwt = require('../middleware/authRequired');
const router = express.Router();

//GET all city codes
router.get("/",checkJwt, getWeather);

module.exports = router;
