const express = require("express");

const { getWeather } = require("../controllers/weatherController");

const { checkJwt, authErrorHandler } = require("../middleware/authRequired");
const router = express.Router();

//GET all city codes
router.get("/", checkJwt, getWeather);

// Add error handler
router.use(authErrorHandler);

module.exports = router;
