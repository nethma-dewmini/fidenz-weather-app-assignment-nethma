# Weather App - Full Stack Application

A secure, modern weather application built with React frontend and Node.js backend, featuring Auth0 authentication and displaying real-time weather information for multiple cities.

## Features

- ** Authentication & Authorization**: Secure login/logout using Auth0
- ** Protected Routes**: Only authenticated users can access weather data
- ** Dashboard View**: Display weather cards for multiple cities with real-time data
- ** Detailed Weather View**: Click on any city card to view comprehensive weather information
- ** Responsive Design**: Works seamlessly on desktop and mobile devices
- ** Real-time Data**: Fetches live weather data from OpenWeatherMap API
- ** Data Caching**: Server-side caching to reduce API calls and improve performance
- ** Interactive UI**: Modern gradient cards with hover effects
- ** JWT Token Validation**: Secure API endpoints with JWT Bearer tokens

##  Technology Stack

### Frontend
- **React 18+**: Modern React with hooks
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router DOM**: Client-side routing
- **Auth0 React SDK**: Authentication integration

### Backend
- **Node.js**: JavaScript runtime (v16+)
- **Express.js**: Web application framework
- **MongoDB + Mongoose**: NoSQL database with ODM
- **Auth0**: Authentication and authorization platform
- **express-oauth2-jwt-bearer**: JWT validation middleware
- **OpenWeatherMap API**: Real-time weather data source

### Authentication & Security
- **Auth0**: Identity management platform
- **JWT (RS256)**: JSON Web Token with RSA signature
- **Bearer Token Authentication**: Secure API access
- **Protected API Routes**: All endpoints require valid authentication

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **OpenWeatherMap API Key** - Get free API key at [OpenWeatherMap](https://openweathermap.org/api)
4. **Auth0 Account** - Create free account at [Auth0](https://auth0.com/)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fidenz-weather-app-nethma
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/WeatherApp

# OpenWeatherMap API
OPENWEATHER_API_KEY=openweathermap_api_key

# Auth0 Configuration
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_AUDIENCE=https://weather-api.fidenz.com
```

#### Seed the Database
```bash
node seed.js
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd client
npm install
```

#### Configure Auth0
The Auth0 configuration is in `client/src/main.jsx`:

```javascript
const domain = "your-tenant.auth0.com"
const clientId = "your_client_id"
const audience = "https://weather-api.fidenz.com"
```

Update these values with your Auth0 credentials.

## Auth0 Configuration

### Step 1: Create Auth0 Application
1. Login to [Auth0 Dashboard](https://manage.auth0.com/)
2. Go to **Applications** → **Applications**
3. Click **Create Application**
4. Choose **Single Page Web Applications**
5. Note the **Domain** and **Client ID**

### Step 2: Configure Application Settings
In your Auth0 Application settings:
- **Allowed Callback URLs**: `http://localhost:5174, http://localhost:5173`
- **Allowed Logout URLs**: `http://localhost:5174, http://localhost:5173`
- **Allowed Web Origins**: `http://localhost:5174, http://localhost:5173`

### Step 3: Create API in Auth0
1. Go to **Applications** → **APIs**
2. Click **Create API**
3. Enter:
   - **Name**: Weather API
   - **Identifier**: `https://weather-api.fidenz.com`
   - **Signing Algorithm**: RS256

### Step 4: Enable MFA (Multi-Factor Authentication)
1. Go to **Security** → **Multi-factor Auth**
2. Enable **Email** as MFA method
3. Set policy to **Always** require MFA

### Step 5: Disable Public Signups
1. Go to **Authentication** → **Database**
2. Select your connection (e.g., Username-Password-Authentication)
3. Enable **Disable Sign Ups** toggle

### Step 6: Create Test User
1. Go to **User Management** → **Users**
2. Click **Create User**
3. Enter:
   - **Email**: `careers@fidenz.com`
   - **Password**: `Pass#fidenz`
4. Verify the email address

## Running the Application

### 1. Start the Backend Server
```bash
cd server
npm run dev
# or
npm start
```
The backend will run on `http://localhost:5000`

You should see:
```
listening on port 5000
MongoDB connected
Auth0 Config: { issuerBaseURL: '...', audience: '...' }
```

### 2. Start the Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173` or `http://localhost:5174`

### 3. Access the Application
1. Open `http://localhost:5173` in your browser
2. Click **"Log In to View Weather"**
3. Enter credentials: `careers@fidenz.com` / `Pass#fidenz`
4. Complete MFA if prompted (check email)
5. View the weather dashboard with city cards

## API Endpoints

### Weather Endpoints
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/cities` | Fetch weather data for all cities | Required (JWT) |

### Authentication Flow
1. User logs in via Auth0
2. Frontend receives JWT access token
3. Token is sent in `Authorization: Bearer <token>` header
4. Backend validates JWT using Auth0's public key
5. Protected data is returned

## Project Structure

```
fidenz-weather-app-nethma/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── AuthButtons.jsx  # Login/Logout buttons
│   │   │   ├── Header.jsx       # App header
│   │   │   └── WeatherCard.jsx  # Weather card component
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx    # Main dashboard with city cards
│   │   │   └── ViewWeather.jsx  # Detailed weather view
│   │   ├── App.jsx              # Main app with routing
│   │   ├── main.jsx             # Entry point with Auth0Provider
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── vite.config.js           # Vite configuration with proxy
│   └── tailwind.config.js       # Tailwind CSS configuration
│
├── server/                      # Node.js Backend
│   ├── controllers/
│   │   └── weatherController.js # Weather API logic
│   ├── middleware/
│   │   └── authRequired.js      # JWT validation middleware
│   ├── models/
│   │   └── City.js              # MongoDB City schema
│   ├── routes/
│   │   └── cityRoutes.js        # API routes
│   ├── cities.json              # Seed data
│   ├── seed.js                  # Database seeding script
│   ├── server.js                # Express server entry point
│   ├── package.json
│   └── .env                     # Environment variables
│
├── README.md                    # This file
├── AUTH0_SETUP_GUIDE.md         # Detailed Auth0 setup
├── AUTH0_API_SETUP.md           # API configuration guide
└── TROUBLESHOOTING_401.md       # 401 error solutions
```

## Key Features Implementation

### 1. Authentication & Authorization
- **Auth0 Integration**: Secure user authentication using industry-standard OAuth 2.0
- **JWT Tokens**: Access tokens with RS256 signing algorithm
- **Protected Routes**: Both frontend and backend routes require authentication
- **Token Validation**: Server-side JWT validation using `express-oauth2-jwt-bearer`
- **Login/Logout**: Seamless authentication flow with Auth0 Universal Login

### 2. Weather Data Management
- **Smart Caching**: Server-side caching reduces API calls and improves response times
- **Data is cached for 5 minutes per city**
- **Automatic Refresh**: Stale data is automatically refreshed from OpenWeatherMap
- **MongoDB Storage**: Cities and metadata stored in MongoDB
- **Error Handling**: Graceful error handling for API failures

### 3. Responsive Design
- **Mobile-First**: Built with mobile devices as the primary target
- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **Adaptive Grid**: Layout adjusts based on screen size
  - Desktop: 3 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- **Touch-Friendly**: Large touch targets for mobile users

### 4. UI Design
The frontend implementation features:
- **Color-Coded Cards**: Each city has a unique gradient color
- **Weather Icons**: Visual representation of weather conditions
- **Detailed Information**: Temperature, humidity, pressure, wind, sunrise/sunset
- **Hover Effects**: Interactive animations on card hover
- **Smooth Transitions**: Polished user experience with CSS transitions
- **Typography**: Clean, readable font hierarchy

## Security Features

- **Authentication Required**: All routes protected by Auth0
- **JWT Token Validation**: Server validates tokens on every request
- **HTTPS Ready**: Production-ready security configuration
- **Environment Variables**: Sensitive data stored securely in `.env` files
- **CORS Configured**: Cross-Origin Resource Sharing properly set up
- **No Public Signups**: Only pre-registered users can access
- **MFA Support**: Multi-factor authentication via email

## Testing the Application

### Test Credentials
- **Email**: `careers@fidenz.com`
- **Password**: `Pass#fidenz`

### Test Scenarios
1. **Login Flow**
   - Navigate to the app
   - Click "Log In to View Weather"
   - Enter credentials
   - Complete MFA if prompted
   - Verify dashboard loads

2. **Protected Routes**
   - Try accessing `/` without login → Should show login prompt
   - Login → Dashboard should appear with weather cards

3. **Weather Data**
   - Verify all city cards display correctly
   - Check temperature, weather description, and icons
   - Click on a card → Should navigate to detailed view

4. **Detailed View**
   - Click any city card
   - Verify detailed weather information displays
   - Check all metrics (pressure, humidity, wind, sunrise/sunset)
   - Click "Back" button → Should return to dashboard

5. **Logout**
   - Click "Log Out" button
   - Should return to login prompt
   - Try accessing dashboard → Should be redirected to login

## Troubleshooting

### 401 Unauthorized Error
**Problem**: API requests return 401 Unauthorized

**Solutions**:
1. **Create API in Auth0**: 
   - Make sure you created an API with identifier `https://weather-api.fidenz.com`
   - See `AUTH0_API_SETUP.md` for detailed steps

2. **Check Environment Variables**:
   - Verify `AUTH0_ISSUER_BASE_URL` and `AUTH0_AUDIENCE` in `server/.env`
   - Ensure no trailing slashes in URLs

3. **Clear Browser Cache**:
   - Logout completely
   - Clear browser cache or use Incognito mode
   - Login again to get fresh token

4. **Verify Token**:
   - Open browser console
   - Check for "Access token obtained: Token exists"
   - Copy token and decode at [jwt.io](https://jwt.io)
   - Verify `aud` claim matches your API identifier

### MongoDB Connection Error
**Problem**: `MongoDB connection error`

**Solutions**:
- Check MongoDB is running (local) or connection string is correct (Atlas)
- Verify `MONGO_URI` in `.env` file
- Check network/firewall settings

### OpenWeatherMap API Error
**Problem**: Weather data not loading

**Solutions**:
- Verify `OPENWEATHER_API_KEY` in `.env`
- Check API key is active at OpenWeatherMap
- Verify API quota not exceeded (free tier: 1000 calls/day)

### Port Already in Use
**Problem**: `Port 5000 is already in use`

**Solutions**:
- Change `PORT` in `server/.env`
- Kill the process using port 5000
- On Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

## Additional Resources

- **Auth0 Setup Guide**: `AUTH0_SETUP_GUIDE.md` - Complete authentication setup
- **API Configuration**: `AUTH0_API_SETUP.md` - Auth0 API creation steps
- **Troubleshooting**: `TROUBLESHOOTING_401.md` - Detailed 401 error solutions

## External Links

- [Auth0 Documentation](https://auth0.com/docs)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Documentation](https://docs.mongodb.com)

## Development

### Available Scripts

#### Backend (`server/`)
```bash
npm start          # Start server with node
npm run dev        # Start server with nodemon (auto-reload)
node seed.js       # Seed database with initial cities
```

#### Frontend (`client/`)
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Deployment

### Backend Deployment (Heroku, Railway, etc.)
1. Set environment variables in hosting platform
2. Ensure MongoDB is accessible
3. Update Auth0 allowed origins/callbacks

### Frontend Deployment (Vercel, Netlify, etc.)
1. Build the production bundle: `npm run build`
2. Deploy the `dist/` directory
3. Update Auth0 application URLs
4. Set environment variables if needed

## Environment Variables Reference

### Backend (`.env`)
```env
PORT=5000                                    # Server port
MONGO_URI=mongodb+srv://...                  # MongoDB connection string
OPENWEATHER_API_KEY=your_api_key             # OpenWeatherMap API key
AUTH0_ISSUER_BASE_URL=https://tenant.auth0.com  # Auth0 tenant URL
AUTH0_AUDIENCE=https://weather-api.fidenz.com   # Auth0 API identifier
```

### Frontend (`main.jsx`)
```javascript
domain: "tenant.auth0.com"                   # Auth0 domain
clientId: "your_client_id"                   # Auth0 application client ID
audience: "https://weather-api.fidenz.com"   # Auth0 API audience
```

## License

This project is created for educational purposes as part of the Fidenz Technologies internship assignment.

## Author

**Nethma Dewmini**
- GitHub: [@nethma-dewmini](https://github.com/nethma-dewmini)
- Repository: fidenz-weather-app-assignment-nethma

## Acknowledgments

- Fidenz Technologies for the internship opportunity
- Auth0 for authentication platform
- OpenWeatherMap for weather data API
- Open source community for the amazing tools and libraries

---

**2024 Fidenz Technologies | Weather App Assignment**

