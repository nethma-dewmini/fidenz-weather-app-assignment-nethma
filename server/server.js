require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cityRoutes = require('./routes/cityRoutes');

// express app
const app = express();
const PORT = process.env.PORT || 5000;

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI)

.then( () => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.headers.authorization) {
    console.log('Authorization header present:', req.headers.authorization.substring(0, 30) + '...');
  } else {
    console.log('No Authorization header');
  }
  next();
});

// routes
app.get("/", (req, res) => {
  res.json({ mssg: "weather app API is running" });
});

app.use('/api/cities', cityRoutes);

// listen for requests
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
