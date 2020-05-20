import React, { Component } from 'react';
import ContributionCard from './ContributionCard';
import {
    Box,
    Card,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { GetAllEvaluations, getTemplate } from '../../../utils/API';
import * as _ from 'lodash';
import NightsStayIcon from '@material-ui/icons/NightsStay';

const MyCard = styled(Card)({
    background: '#EEEEEE',
    border: 0,
    borderRadius: 5,
    color: 'black',
    height: 100,
    width: 325,
    textAlign: 'center',
    '&:hover': {
        cursor: 'pointer',
    },
});
class ContributionPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            template: {},
            userInfo: props.userInfo,
            loading: true,
        };
    }

    componentDidMount = async () => {
        console.log(this.state.userInfo);
        let evals = await (await GetAllEvaluations()).data.data;
        _.orderBy(evals, ['end_date'], ['desc']);
        let survey = '';
        survey = evals.find(
            (survey) => survey.e_id === this.state.userInfo.data._id
        );
        console.log(survey);
        if (survey != null) {
            let template = await (await getTemplate(survey._id)).data;
            console.log(template);
            this.setState({
                survey: survey,
                template: template,
                loading: false,
            });
        }
    };
    getColor = (x) => {
        var color = '';
        if (x >= 4) color = '#5ABE41';
        else if (x === 3) color = '#FFB400';
        else color = '#FE0642';
        return color;
    };
    getDiffColor = (x) => {
        var color = '';
        if (x >= 0) color = '#5ABE41';
        else color = '#FE0642';
        return color;
    };
    getColleaguesScore = (index) => {
        var score = 0;
        var nrOfAnswers = 0;
        const responses = this.state.survey.responses;
        for (var i = 0; i < responses.length; i++) {
            for (var j = 0; j < responses[i].answers.length; j++) {
                if (
                    responses[i].answers[j].s_id == index + 1 &&
                    responses[i].user_id != this.props.userInfo.data._id
                ) {
                    score =
                        score + parseInt(responses[i].answers[j].content, 10);
                    nrOfAnswers++;
                }
            }
        }
        if (nrOfAnswers === 0) {
            return 0;
        } else {
            score = score / nrOfAnswers;
            return Math.round(score * 10) / 10;
        }
    };
    getYourScore = (index) => {
        var score = 0;
        var nrOfAnswers = 0;
        const responses = this.state.survey.responses;
        for (var i = 0; i < responses.length; i++) {
            for (var j = 0; j < responses[i].answers.length; j++) {
                if (
                    responses[i].answers[j].s_id == index + 1 &&
                    responses[i].user_id == this.state.userInfo.data._id
                ) {
                    score =
                        score + parseInt(responses[i].answers[j].content, 10);
                    nrOfAnswers++;
                }
            }
        }
        if (nrOfAnswers === 0) {
            return 0;
        } else {
            score = score / nrOfAnswers;
            return Math.round(score * 10) / 10;
        }
    };
    getScoreDifference = (index) => {
        return this.getColleaguesScore(index) - this.getYourScore(index);
    };
    render() {
        if (this.state.loading) {
            return (
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    style={{ color: '#fff', fontSize: '90px' }}
                >
                    <NightsStayIcon color="inherit" fontSize="inherit" />

                    <Typography
                        style={{
                            fontFamily: 'Source Sans pro',
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#fff',
                            marginLeft: '2rem',
                        }}
                    >
                        You have not been evaluated yet!
                    </Typography>
                </Box>
            );
        } else {
            return (
                <div className="cards-container">
                    {' '}
                    {this.state.template.sections.map((section, index) => {
                        return (
                            <MyCard
                                style={{
                                    marginRight: '3em',
                                    marginBottom: '1em',
                                }}
                            >
                                <Typography
                                    style={{
                                        fontFamily: 'Source Sans Pro',
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        color: '#262E3F',
                                        lineHeight: '15px',
                                        marginTop: '0.3rem',
                                        marginBottom: '0',
                                    }}
                                >
                                    {section.name}
                                </Typography>
                                <hr
                                    style={{
                                        width: '50%',
                                        color: '#CECECE',
                                        margin: '5px auto 0 auto',
                                    }}
                                ></hr>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    margin="0 1rem 0 1rem"
                                >
                                    <Box>
                                        <p
                                            style={{
                                                margin: '0',
                                                fontFamily: 'Source Sans Pro',
                                                color: '#262E3F',
                                            }}
                                        >
                                            Colleagues
                                        </p>
                                        <h1
                                            style={{
                                                fontSize: '30px',

                                                margin: '0',
                                                color: this.getColor(
                                                    this.getColleaguesScore(
                                                        index
                                                    )
                                                ),
                                            }}
                                        >
                                            {this.getColleaguesScore(index)}
                                        </h1>
                                    </Box>
                                    <Box>
                                        <p
                                            style={{
                                                margin: '0',
                                                fontFamily: 'Source Sans Pro',
                                                color: '#262E3F',
                                            }}
                                        >
                                            You
                                        </p>
                                        <h1
                                            style={{
                                                fontSize: '30px',

                                                margin: '0',

                                                color: this.getColor(
                                                    this.getYourScore(index)
                                                ),
                                            }}
                                        >
                                            {this.getYourScore(index)}
                                        </h1>
                                    </Box>
                                    <Box>
                                        <p
                                            style={{
                                                margin: '0',
                                                fontFamily: 'Source Sans Pro',
                                                color: '#262E3F',
                                            }}
                                        >
                                            Difference
                                        </p>
                                        <h1
                                            style={{
                                                fontSize: '30px',

                                                margin: '0',
                                                color: this.getDiffColor(
                                                    this.getScoreDifference(
                                                        index
                                                    )
                                                ),
                                            }}
                                        >
                                            {this.getScoreDifference(index)}
                                        </h1>
                                    </Box>
                                </Box>
                            </MyCard>
                        );
                    })}
                </div>
            );
        }
    }
}

export default ContributionPoints;
