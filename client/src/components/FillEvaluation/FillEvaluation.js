import React, { Component } from 'react';
import { makeStyles, Box, Typography, Avatar } from '@material-ui/core';
import './FillEvaluation.css';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import Question from './Question';
import Submitted from './Submit/Submitted';
import Loading from '../Loading/Loading';
import { GetUserEvals } from '../../utils/API';
import * as _ from 'lodash';
import history from '../../utils/history';

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
        const {
            fromProfile: {
                answers,
                template: { description, name, sections },
                user_data: { given_name, family_name },
            },
            myId,
        } = this.props.location.state;

        this.setState({
            sections: sections,
            name: given_name,
            fullName: `${given_name} ${family_name}`,
            templateName: name,
            userId: myId,
            response: answers,
        });
    }
    componentDidUpdate = async () => {
        const res = await (await GetUserEvals(this.state.userId)).data;
        const responses = res.responses;
        var response = '';
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].survey_id === this.state.response.survey_id) {
                response = responses[i];
            }
        }
        if (
            !_(response.answers)
                .differenceWith(this.state.response.answers, _.isEqual)
                .isEmpty()
        ) {
            this.setState({ response });
        }
    };

    render() {
        const component = this;
        if (!component.state.sections.length) {
            return <Loading />;
        }

        function Finished(props) {
            if (props.component.state.finished === false) {
                return (
                    <div className='background'>
                        <AdminNavBar />
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
                    <div className='background'>
                        <AdminNavBar />
                        <div className='submitted-margin'>
                            <Submitted
                                header='Your answer was submitted!'
                                subHeader='Thank you for your answers'
                                button={{
                                    name: 'Home',
                                    func: () => history.push('/profile'),
                                }}
                            />
                        </div>
                    </div>
                );
            }
        }
        return <Finished component={component}></Finished>;
    }
}

export default FillEvaluation;
