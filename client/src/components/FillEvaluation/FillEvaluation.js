import React, { Component } from 'react';
import { makeStyles, Box, Typography, Avatar } from '@material-ui/core';
import './FillEvaluation.css';
import NavBar from '../NavBar/NavBar';
import Question from './Question';
import Submitted from './Submit/Submitted';
import Loading from '../Loading/Loading';

class FillEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            fullName: '',
            templateName: '',
            currentSection: 1,
            currentQuestion: 1,
            userId: '',
            finish: false,
            finished: false,
            sections: [],
            response: '',
        };
    }
    componentDidMount() {
        console.log(this.props.location.state);
        const {
            fromProfile: {
                answers,
                template: { description, name, sections },
                user_data: { given_name, family_name },
            },
            myId,
        } = this.props.location.state;
        console.log(answers);
        this.setState({
            sections: sections,
            name: given_name,
            fullName: `${given_name} ${family_name}`,
            templateName: name,
            userId: myId,
            response: answers,
        });
    }

    render() {
        const component = this;
        if (!component.state.sections.length) {
            return <Loading />;
        }

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
                                marginTop: '2rem',
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
                        <p
                            style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontFamily: 'Source Sans Pro',
                                textTransform: 'uppercase',
                            }}
                        >
                            Section{' '}
                            {`${component.state.currentSection}/${component.state.sections.length}`}
                        </p>
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
