import React, { Component } from 'react';
import * as _ from 'lodash';
import {
    Button,
    makeStyles,
    Box,
    Card,
    Typography,
    TextField,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { styled } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Scale from './Scale';
import { GetUserById, UpdateUserResponses } from '../../utils/API';

const MyCard = styled(Card)({
    background: '#222222',
    border: 0,
    borderRadius: 15,
    color: 'white',
    height: 600,
    width: 1200,
    textAlign: 'center',
});

const MyTextField = styled(TextField)({
    color: 'white!important',
    label: 'Hello',
});
const MyButton = styled(Button)({
    background: 'transparent',
    border: 0,
    color: '#4392FE',
    height: 30,
    width: 150,
    marginTop: '2rem',
    marginBottom: '1.6rem',
    transition: 'ease-in-out 0.2s',
    '& :hover': {
        color: '#5ABE41',
    },
});
const MyButton2 = styled(Button)({
    background: 'transparent',
    border: 0,
    color: '#4392FE',
    marginTop: '0.7rem',
    transition: 'ease-in-out 0.2s',
    '& :hover': {
        color: '#FE0642',
    },
});
const ContinueButton = styled(Button)({
    backgroundColor: '#4392FE',
    border: 0,
    color: 'white',
    marginTop: '0.7rem',
    borderRadius: 30,
    height: '40px',
    width: '125px',
    float: 'right',
    transition: 'ease-in-out 0.2s',
    '& :hover': {
        backgroundColor: '#4392FE',
        transform: 'scale(1,1)',
    },
});
const BackButton = styled(Button)({
    backgroundColor: 'transparent',
    border: '1px solid #4392FE',
    color: 'white',
    marginTop: '0.7rem',
    borderRadius: 30,
    height: '40px',
    width: '125px',
    transition: 'ease-in-out 0.2s',
});

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: false,
            component: this.props.component,
            commentText: '',
            answer: '',
        };
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer(num) {
        this.setState({ answer: num });
    }

    handleAddComment = async (event) => {
        this.setState({ comment: true });
    };
    handleComment = async (event) => {
        const commentText = event.target.value;
        console.log(commentText);
        this.setState({ commentText });
    };
    handleRemoveComment = async (event) => {
        this.setState({ comment: false });
    };
    handleContinue = async (event) => {
        var currentSection = this.state.component.state.currentSection;
        var currentQuestion = this.state.component.state.currentQuestion;
        var currentSectionLength = this.state.component.state.sections[
            currentSection - 1
        ].questions.length;
        var nrOfSections = this.state.component.state.sections.length;
        console.log(nrOfSections);

        if (this.state.answer === '') {
            window.alert('Fill in answer!');
        } else {
            window.alert('Good answer!' + this.state.answer);
            const res = await (
                await GetUserById(this.state.component.state.userId)
            ).data;
            var responses = res.responses;
            var answers = [];
            var answer = {
                q_id: currentQuestion,
                s_id: currentSection,
                content: this.state.answer,
                comment: this.state.commentText,
            };
            for (var i = 0; i < responses.length; i++) {
                if (
                    responses[i].survey_id ===
                    this.state.component.state.response.survey_id
                ) {
                    for (var j = 0; j < responses[i].answers.length; j++) {
                        if (
                            responses[i].answers[j].q_id === answer.q_id &&
                            responses[i].answers[j].s_id === answer.s_id
                        ) {
                            responses[i].answers.splice(j, 1);
                        }
                    }
                    responses[i].answers.push(answer);
                }
            }
            console.log(responses);

            //Pushing the new answer to the database.

            const pushingApi = await UpdateUserResponses(
                this.state.component.state.userId,
                { responses: responses }
            );
            console.log('Done!');
            console.log(pushingApi);

            if (
                currentSection === nrOfSections &&
                currentQuestion === currentSectionLength - 1
            ) {
                this.state.component.setState({ finish: true });
            } else {
                this.state.component.setState({ finish: false });
            }
            if (currentSection === nrOfSections) {
                if (currentQuestion === currentSectionLength) {
                    this.state.component.setState({ finished: true });
                } else {
                    currentQuestion++;
                    this.state.component.setState({ currentQuestion });
                }
            } else {
                if (currentQuestion === currentSectionLength) {
                    currentQuestion = 1;
                    currentSection++;
                    this.state.component.setState({ currentSection });
                    this.state.component.setState({ currentQuestion });
                } else {
                    currentQuestion++;

                    this.state.component.setState({ currentQuestion });
                }
            }
        }
    };
    handleBack = async (event) => {
        var currentSection = this.state.component.state.currentSection;
        var currentQuestion = this.state.component.state.currentQuestion;
        var currentSectionLength = this.state.component.state.sections[
            currentSection - 1
        ].questions.length;
        var nrOfSections = this.state.component.state.sections.length;
        console.log(nrOfSections);

        if (currentSection === 1) {
            if (currentQuestion === 1) {
            } else {
                currentQuestion--;
                this.state.component.setState({ currentQuestion });
            }
        } else {
            if (currentQuestion === 1) {
                currentSection--;
                currentQuestion = this.state.component.state.sections[
                    currentSection - 1
                ].questions.length;
                this.state.component.setState({ currentSection });
                this.state.component.setState({ currentQuestion });
            } else {
                currentQuestion--;
                this.state.component.setState({ currentQuestion });
            }
        }
    };
    render() {
        var comp = this;
        function GetCurrentAnswer(props) {
            const answers = props.state.response.answers;
            const currentQuestion = props.state.currentQuestion;
            const currentSection = props.state.currentSection;
            for (var i = 0; i < answers.length; i++) {
                if (
                    answers[i].q_id === currentQuestion &&
                    answers[i].s_id === currentSection
                ) {
                    console.log('Found current question!');
                    return answers[i];
                }
            }
            return 'null';
        }
        function Comment(props) {
            GetCurrentAnswer(props.comp);
            if (props.comment === false) {
                return (
                    <MyButton onClick={comp.handleAddComment}>
                        {' '}
                        <AddCircleIcon style={{ marginRight: '5px' }} />
                        Add comment
                    </MyButton>
                );
            } else {
                return (
                    <Box alignItems="center" style={{ marginTop: '2rem' }}>
                        <MyButton2 onClick={comp.handleRemoveComment}>
                            <RemoveCircleIcon></RemoveCircleIcon>
                        </MyButton2>
                        <TextField
                            id="filled-basic"
                            label="Comment"
                            variant="filled"
                            style={{
                                width: '580px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                            autoFocus="true"
                            value={comp.state.commentText}
                            InputProps={{
                                style: {
                                    color: 'white',
                                    fontFamily: 'Source Sans Pro',
                                },
                            }}
                            onChange={comp.handleComment}
                        ></TextField>
                    </Box>
                );
            }
        }
        function Continue(props) {
            if (props.finish === false) {
                return (
                    <ContinueButton onClick={props.comp.handleContinue}>
                        Continue
                    </ContinueButton>
                );
            } else {
                return (
                    <ContinueButton onClick={props.comp.handleContinue}>
                        Finish
                    </ContinueButton>
                );
            }
        }
        return (
            <Box display="flex" flexDirection="row">
                <MyCard style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                    <Typography
                        style={{
                            color: '#4392FE',
                            marginTop: '2rem',
                            fontFamily: 'Source Sans pro',
                        }}
                    >
                        {this.state.component.state.currentQuestion} /{' '}
                        {
                            this.state.component.state.sections[
                                this.state.component.state.currentSection - 1
                            ].questions.length
                        }
                    </Typography>
                    <Typography
                        style={{
                            fontFamily: 'Source Sans pro',
                            fontSize: '24px',
                            fontWeight: '500',
                            marginTop: '2rem',
                        }}
                    >
                        {this.state.component.state.sections[
                            this.state.component.state.currentSection - 1
                        ].questions[
                            this.state.component.state.currentQuestion - 1
                        ].content.replace(
                            /#name/,
                            this.state.component.state.name
                        )}
                    </Typography>
                    <Typography
                        style={{
                            fontFamily: 'Source Sans pro',
                            fontSize: '16px',
                            fontWeight: '300',
                            marginTop: '1rem',
                            opacity: '75%',
                        }}
                    >
                        {
                            this.state.component.state.sections[
                                this.state.component.state.currentSection - 1
                            ].questions[
                                this.state.component.state.currentQuestion - 1
                            ].description
                        }
                    </Typography>
                    <Scale handler={this.handleAnswer} />
                    <Comment
                        comment={comp.state.comment}
                        comp={this.state.component}
                    />

                    <Box
                        style={{
                            width: '50%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '4rem',
                        }}
                    >
                        <Continue
                            finish={this.state.component.state.finish}
                            comp={this}
                        ></Continue>
                        <BackButton
                            onClick={this.handleBack}
                            style={{ float: 'left' }}
                        >
                            Back
                        </BackButton>
                    </Box>
                </MyCard>
            </Box>
        );
    }
}

export default Question;
