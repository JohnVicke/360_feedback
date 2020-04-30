import React from 'react';
import './Landing.css';
import Logo from '../../assets/logos/logohorizontal.svg';
import LoginButton from './LoginButton';
import { useAuth0 } from '../../react-auth0-spa';

const LandingPage = () => {
    const { loginWithPopup } = useAuth0();

    return (
        <div className='landing-page'>
            <div className='overlay'>
                <div className='logo'>
                    <img
                        className='para-logo'
                        src={Logo}
                        alt='paradox-logo'
                    ></img>
                </div>
                <div className='welcome-text'>
                    <h1>Welcome to 360 Feedback!</h1>
                </div>

                <div className='login-area'>
                    <LoginButton
                        variant='contained'
                        className='login-button'
                        onClick={() => loginWithPopup({})}
                    >
                        Log in
                    </LoginButton>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
