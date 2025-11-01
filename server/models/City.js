const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citySchema = new Schema({
  CityCode: {
    type: String,
    required: true,
    unique: true,
  },
  CityName: {
    type: String,
    required: true,
  },
  LastFetched: {
    type: Date,
    required: null,
  },
  WeatherData: {
    type: Object,
    required: {},
  },
});

module.exports = mongoose.model("City", citySchema);
