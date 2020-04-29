import React, { Component } from 'react';
import './Landing.css';
import Background from './para-background.png';
import Logo from './logo.svg';
import LoginButton from './LoginButton';
import { useAuth0 } from '../../react-auth0-spa';

const LandingPage = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className="landing-page">
            <div className="overlay">
                <div className="logo">
                    <img
                        className="para-logo"
                        src={Logo}
                        alt="paradox-logo"
                    ></img>
                </div>
                <div className="welcome-text">
                    <h1>Welcome to 360 Feedback!</h1>
                </div>
                <div className="login-area">
                    <LoginButton
                        variant="contained"
                        className="login-button"
                        onClick={() => loginWithRedirect({})}
                    >
                        Log in
                    </LoginButton>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
