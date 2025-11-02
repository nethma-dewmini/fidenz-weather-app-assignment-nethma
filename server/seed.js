const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const City = require("./models/City");

dotenv.config();

const cities = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "cities.json"), "utf-8")
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected for seeding..."))
  .catch((err) => console.error(err));

const importData = async () => {
  try {
    await City.deleteMany();
    console.log("Old data cleared");

    const cityData = cities.List.map(city => ({
      CityCode: city.CityCode,
      CityName: city.CityName,
      LastFetched: null,
      WeatherData: {}
    }));

    await City.insertMany(cityData);
    console.log("Data successfully imported");
    process.exit();

  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
};

importData();
