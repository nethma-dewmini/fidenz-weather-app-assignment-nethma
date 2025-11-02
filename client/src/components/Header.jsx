import React from 'react';

const Header = () => {
    return (
        <header className="app-header w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-4xl font-light text-white mb-4 md:mb-0">
                Weather App
            </h2>

            <div className="add-city-bar flex w-full md:w-auto">
                <input
                type="text"
                placeholder="Enter a City"
                className="p-2 rounded-l-md text-gray-800 focus:outline-none"
                disabled
                />
                <button
                type="button"
                className="p-3 px-6 rounded-r-md bg-purple-600 text-white cursor-not-allowed opacity-50"
                disabled
                >
                    Add City
                </button>
            </div>
        </header>

    )
}

export default Header;