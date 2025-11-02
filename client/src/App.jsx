import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard";
import ViewWeather from "./pages/ViewWeather.jsx";
import AuthButtons from "./components/AuthButtons.jsx";
import backgroundImg from "./assets/background.png";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="text-center p-20 text-xl">
        Loading authentication state...
      </div>
    );
  }

  return (
    <div
      className="App min-h-screen flex flex-col items-center p-5 box-border relative"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AuthButtons />

      {isAuthenticated ? (
        // Render routes only if the user is authenticated
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/weather/:cityCode" element={<ViewWeather />} />
        </Routes>
      ) : (
        // Show login prompt if not authenticated
        <div className="flex flex-col items-center justify-center min-h-screen -mt-20">
          <h1 className="text-5xl font-light mb-4">Secure Weather App</h1>
          <p className="text-xl text-gray-400">
            Please log in to access the weather dashboard.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
