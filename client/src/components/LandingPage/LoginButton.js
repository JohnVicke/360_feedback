import React, { Component } from 'react';
import './Landing.css';
import Google from '../../assets/logos/google.png';
import { Box } from '@material-ui/core';

class LoginButton extends Component {
    render() {
        return (
            <button className='login-button' onClick={this.props.onClick}>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-around'
                >
                    <img src={Google}></img>
                    Sign in with Google
                </Box>
            </button>
        );
    }
}
export default LoginButton;
