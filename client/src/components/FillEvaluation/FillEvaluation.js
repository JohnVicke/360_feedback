import React, { Component } from 'react';
import { makeStyles, Box, Typography, Avatar } from '@material-ui/core';
import './FillEvaluation.css';
import NavBar from '../NavBar/NavBar';
import Question from './Question';

class FillEvaluation extends Component {
    render() {
        return (
            <div className="background">
                <NavBar />
                <Typography
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '24px',
                        fontFamily: 'Source Sans Pro',
                        fontWeight: '400',
                        textTransform: 'uppercase',
                        marginTop: '5rem',
                    }}
                >
                    Viktor Malmedal - December evaluation
                </Typography>
                <hr style={{ width: '1200px' }} />
                <Typography
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '20px',
                        fontFamily: 'Source Sans Pro',
                        fontWeight: '400',
                        textTransform: 'uppercase',
                        marginTop: '3rem',
                    }}
                >
                    Section 1: Accountability
                </Typography>
                <Question />
            </div>
        );
    }
}

export default FillEvaluation;
