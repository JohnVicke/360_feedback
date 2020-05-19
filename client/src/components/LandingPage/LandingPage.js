import React from 'react';
import './Landing.css';
import Logo from '../../assets/logos/logohorizontal.svg';
import LoginButton from './LoginButton';
import ComboBox from '../CreateEvaluation/AutoComplete';
import { useAuth0 } from '../../react-auth0-spa';

const users = {
    users: [
        {
            responses: [],
            _id: '5e8c66fc1c9d4400007665da',
            given_name: 'Viktor',
            family_name: 'Malmedal',
            role: 'Developer',
            picture:
                'https://pmcdeadline2.files.wordpress.com/2019/10/shutterstock_editorial_10434333bm.jpg',
            email: 'testerboi@gmail.com',
        },
        {
            responses: [],
            _id: '5e8c66fc1c9d4400007665da',
            given_name: 'Isak',
            family_name: 'Larsson',
            role: 'Developer',
            picture:
                'https://pmcdeadline2.files.wordpress.com/2019/10/shutterstock_editorial_10434333bm.jpg',
            email: 'testerboi@gmail.com',
        },
        {
            responses: [],
            _id: '5e8c66fc1c9d4400007665da',
            given_name: 'Staffan',
            family_name: 'Westerlund',
            role: 'Developer',
            picture:
                'https://pmcdeadline2.files.wordpress.com/2019/10/shutterstock_editorial_10434333bm.jpg',
            email: 'testerboi@gmail.com',
        },
    ],
};

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
                    <ComboBox users={users} />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
