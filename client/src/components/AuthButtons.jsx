import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div className="absolute top-4 right-4 z-10">
            {isAuthenticated ? (
                // Logout button is shown if the user is authenticated
                <button 
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    className="p-2 px-4 bg-red-600 rounded-md text-white hover:bg-red-700 transition"
                >
                    Log Out
                </button>
            ) : (
                // Login button is shown if the user is not authenticated
                <button 
                    onClick={() => loginWithRedirect()}
                    className="p-2 px-4 bg-green-600 rounded-md text-white hover:bg-green-700 transition"
                >
                    Log In to View Weather
                </button>
            )}
        </div>
    );
};

export default AuthButtons;