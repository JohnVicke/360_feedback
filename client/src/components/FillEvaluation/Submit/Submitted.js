import React from 'react';
import './submit.css';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const Submitted = (props) => {
    const history = useHistory();

    const HomeButton = styled(Button)({
        border: '1px solid #fff',
        color: 'white',
        borderRadius: 30,
        height: '40px',
        width: '125px',
        transition: 'ease-in-out 0.2s',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#489734',
        },
    });
    const goHome = () => {
        history.push('/profile');
    };
    return (
        <div
            style={{
                margin: '0 auto',
                width: '700px',
                height: '250px',
                backgroundColor: '#489734',
                borderRadius: '8px',
            }}
        >
            <div className="submit-header">
                <div className="svg-container">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 130.2 130.2"
                    >
                        <circle
                            class="path circle"
                            fill="none"
                            stroke="#fff"
                            stroke-width="6"
                            stroke-miterlimit="10"
                            cx="65.1"
                            cy="65.1"
                            r="62.1"
                        />
                        <polyline
                            class="path check"
                            fill="none"
                            stroke="#fff"
                            stroke-width="10"
                            stroke-linecap="round"
                            stroke-miterlimit="10"
                            points="100.2,40.2 51.5,88.8 29.8,67.5 "
                        />
                    </svg>
                </div>
                <div class="success">
                    <h1>Your answer was submitted!</h1>
                    <p>Thank you for your answers</p>
                    <HomeButton onClick={goHome}>Home</HomeButton>
                </div>
            </div>
        </div>
    );
};

export default Submitted;
