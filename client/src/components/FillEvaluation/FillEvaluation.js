import React, { Component } from 'react';
import { makeStyles, Box, Typography, Avatar } from '@material-ui/core';
import './FillEvaluation.css';
import NavBar from '../NavBar/NavBar';
import Question from './Question';
import Submitted from './Submit/Submitted';

class FillEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Viktor',
            fullName: 'Viktor Malmedal',
            templateName: 'Developer evaluation',
            currentSection: 1,
            currentQuestion: 1,
            finish: false,
            finished: false,
            sections: [
                {
                    name: 'Section1',
                    questions: [
                        {
                            type: 'liekert',
                            content: 'How good is #name?',
                            description:
                                'This is a question about how good this employee is',
                            q_id: 1,
                        },
                        {
                            type: 'liekert',
                            content: 'How bad is #name?',
                            description:
                                'This is a question about how bad this employee is',
                            q_id: 2,
                        },
                    ],
                },
                {
                    name: 'Section2',
                    questions: [
                        {
                            type: 'liekert',
                            content: 'How king is #name?',
                            description:
                                'This is a question about how king this employee is',
                            q_id: 1,
                        },
                        {
                            type: 'liekert',
                            content: 'How unking is #name?',
                            description:
                                'This is a question about how unking this employee is',
                            q_id: 2,
                        },
                    ],
                },
            ],
        };
    }
    render() {
        const component = this;

        function Finished(props) {
            if (props.component.state.finished === false) {
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
                            {component.state.fullName} -{' '}
                            {component.state.templateName}
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
                            {
                                component.state.sections[
                                    component.state.currentSection - 1
                                ].name
                            }
                        </Typography>
                        <Question component={component} />
                    </div>
                );
            } else {
                return (
                    <div className="background">
                        <NavBar />
                        <div className="submitted-margin">
                            <Submitted />
                        </div>
                    </div>
                );
            }
        }
        return <Finished component={component}></Finished>;
    }
}

export default FillEvaluation;
