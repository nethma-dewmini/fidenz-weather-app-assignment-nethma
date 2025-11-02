import React from 'react';
import { TiWeatherPartlySunny } from 'react-icons/ti';

const Header = () => {
    return (
       <header className="app-header w-full max-w-6xl flex justify-center items-center mb-8 mt-4">
      <div className="flex items-center gap-3">
        <TiWeatherPartlySunny className="text-5xl text-white" />
        <h2 className="text-3xl font-normal text-white">
          Weather App
        </h2>
      </div>
      </header>

    )
}

export default Header;