import React from 'react';
import './Landing.css';
import Logo from '../../assets/logos/logohorizontal.svg';
import LoginButton from './LoginButton';
import { useAuth0 } from '../../react-auth0-spa';

const LandingPage = () => {
    const { loginWithPopup } = useAuth0();
    const users = [
        {
            given_name: 'Viktor',
            family_name: 'Malmedal',
            role: 'cleaner',
        },
        {
            given_name: 'Hello1',
            family_name: 'Hello',
            role: 'cleaner',
        },
        {
            given_name: 'Hello World2',
            family_name: 'Hello asdl',
            role: 'developer',
        },
        {
            given_name: 'Whast up',
            family_name: 'asjhd',
            role: 'developer',
        },
    ];

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
