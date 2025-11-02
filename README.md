# Weather App - Full Stack Application

A modern weather application built with React frontend and Node.js backend, displaying weather information for multiple cities with an interactive UI that matches the provided design specifications.

## Features

- **Dashboard View**: Display weather cards for multiple cities with real-time data
- **Detailed Weather View**: Click on any city card to view detailed weather information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data**: Fetches live weather data from OpenWeatherMap API
- **Data Caching**: Implements server-side caching to reduce API calls
- **Interactive UI**: Modern gradient cards with hover effects matching the design

## Technology Stack

### Frontend
- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **OpenWeatherMap API**: Weather data source

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v16 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **OpenWeatherMap API Key** (free at openweathermap.org)

## Installation & Setup

### 1. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGO_URI=mongodb://localhost:27017/weather-app
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
PORT=5000
```

### 2. Frontend Setup
```bash
cd client
npm install
```

### 3. Database Setup
Seed the database with initial cities:
```bash
cd server
node seed.js
```

## Running the Application

### 1. Start the Backend Server
```bash
cd server
npm start
```
The backend will run on `http://localhost:5000`

### 2. Start the Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /api/weather` - Fetch weather data for all cities

## Key Features Implementation

### Weather Data Caching
The backend implements intelligent caching to minimize API calls to OpenWeatherMap:
- Data is cached for 5 minutes per city
- Reduces API usage and improves response times

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Grid layout that adapts to different screen sizes
- Cards stack vertically on mobile devices

### UI Design Matching
The frontend implementation closely matches the provided UI design with:
- Color-coded weather cards (Blue for Colombo, Purple for Tokyo, Green for Liverpool, Orange for Sydney, Red for Boston)
- Proper typography and spacing
- Weather icons and detailed information layout
- Interactive hover effects and transitions

