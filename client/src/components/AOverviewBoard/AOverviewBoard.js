import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import {
    Box,
    Typography,
    Button,
    Avatar,
    makeStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@material-ui/core';
import ConPoints from './ConPoints';
import { GetSurveyById } from '../../utils/API';

const useStyles = makeStyles({
    avatar: {
        height: 120,
        width: 120,
    },
});
class AOverviewBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyId: '5eba8593ff1b10be56b09465',
            dialogOpen: false,
            index: 0,
            templateName: 'May Evaluation',
            userId: 1,
            name: 'Isak',
            survey: {
                _id: 1,
                e_id: 1,
                template_id: 1,
                responses: [
                    {
                        user_id: 1,
                        survey_id: 1,
                        answers: [
                            {
                                q_id: 1,
                                s_id: 1,
                                content: 5,
                                comment: 'Average',
                            },
                            { q_id: 2, s_id: 1, content: 5, comment: 'good!' },
                        ],
                    },
                    {
                        user_id: 2,
                        survey_id: 1,
                        answers: [
                            {
                                q_id: 1,
                                s_id: 1,
                                content: 1,
                                comment: 'Bad',
                            },
                            { q_id: 2, s_id: 1, content: 3, comment: 'good!' },
                        ],
                    },
                    {
                        user_id: 3,
                        survey_id: 1,
                        answers: [
                            {
                                q_id: 1,
                                s_id: 1,
                                content: 4,
                                comment: 'I think he is quite trustful.',
                            },
                            {
                                q_id: 2,
                                s_id: 1,
                                content: 3,
                                comment: 'Somewhat.',
                            },
                        ],
                    },
                ],
            },
            template: {
                sections: [
                    {
                        name: 'Trust',
                        questions: [
                            { content: 'Is #name trustful?', q_id: 1 },
                            { content: 'Is #name trustworthy?', q_id: 2 },
                        ],
                    },
                ],
            },
        };
    }

    componentDidMount = async () => {
        const res = await (await GetSurveyById(this.state.surveyId)).data;
        console.log('--------------------------');
        console.log(res);
        console.log('--------------------------');
        this.setState({ userId: res.e_id, survey: res });
    };
    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    handleClickOpen = (index) => {
        this.setState({ dialogOpen: true, index });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };
    getColor = (x) => {
        var color = '';
        if (x >= 4) color = '#5ABE41';
        else if (x === 3) color = '#FFB400';
        else color = '#FE0642';
        return color;
    };
    getYourAnswer = (index, questionId) => {
        console.log(index);
        console.log(questionId);

        const responses = this.state.survey.responses;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].user_id === this.state.userId) {
                for (var j = 0; j < responses[i].answers.length; j++) {
                    const answer = responses[i].answers[j];
                    if (answer.s_id == index + 1 && answer.q_id == questionId) {
                        return answer;
                    }
                }
            }
        }
    };
    getAnswers = (index, questionId) => {
        var answers = [];
        const responses = this.state.survey.responses;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].user_id !== this.state.userId) {
                for (var j = 0; j < responses[i].answers.length; j++) {
                    const answer = responses[i].answers[j];
                    if (answer.s_id == index + 1 && answer.q_id == questionId) {
                        console.log('SHOULD PUSH');
                        answers.push(answer);
                    }
                }
            }
        }
        return answers;
    };

    render() {
        const comp = this;
        if (this.state.userId === 1) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div className="background">
                        <NavBar />
                        <Typography
                            style={{
                                color: '#fff',
                                fontSize: '24px',
                                fontFamily: 'Source Sans Pro',
                                fontWeight: '400',
                                marginTop: '2rem',
                                marginLeft: '5rem',
                                marginBottom: '2rem',
                            }}
                        >
                            {this.state.templateName} for <br />
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                        >
                            <Avatar
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    marginLeft: '5rem',
                                }}
                            />
                            <Box
                                display="flex"
                                flexDirection="row"
                                style={{ margin: '0 2rem' }}
                            >
                                <Typography
                                    style={{
                                        fontFamily: 'Source Sans pro',
                                        color: '#fff',
                                        fontSize: '38px',
                                        fontWeight: '400',
                                        marginRight: '1rem',
                                    }}
                                >
                                    Isak Larsson,
                                </Typography>
                                <Typography
                                    style={{
                                        fontFamily: 'Source Sans pro',
                                        color: '#fff',
                                        fontSize: '38px',
                                        fontWeight: '700',
                                    }}
                                >
                                    Developer
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            style={{
                                fontFamily: 'Source Sans pro',
                                color: '#fff',
                                fontSize: '24px',
                                fontWeight: '400',
                                marginRight: '1rem',
                                marginLeft: '5rem',
                                marginTop: '3rem',
                                marginBottom: '3rem',
                            }}
                        >
                            Overall contribution points
                        </Typography>
                        <ConPoints
                            component={comp}
                            click={this.handleClickOpen}
                        />
                        <Dialog
                            open={this.state.dialogOpen}
                            TransitionComponent={this.Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            maxWidth="lg"
                            fullWidth="true"
                        >
                            <Typography
                                style={{
                                    fontSize: '45px',
                                    textAlign: 'center',
                                    fontFamily: 'Source Sans Pro',
                                    fontWeight: '600',
                                    color: '#262E3F',
                                }}
                            >
                                {
                                    this.state.template.sections[
                                        this.state.index
                                    ].name
                                }
                            </Typography>
                            <Box
                                display="flex"
                                flexWrap="wrap"
                                alignContent="space-between"
                                margin="0 3rem"
                            >
                                {this.state.template.sections[
                                    this.state.index
                                ].questions.map((question) => {
                                    return (
                                        <Box
                                            maxWidth="400px"
                                            style={{ margin: '0 3rem 0 3rem' }}
                                        >
                                            <Typography
                                                style={{
                                                    fontSize: '18px',
                                                    textAlign: 'Left',
                                                    fontFamily:
                                                        'Source Sans Pro',
                                                    fontWeight: '600',
                                                    color: '#262E3F',
                                                    margin: '0 0 1rem 0 ',
                                                }}
                                            >
                                                {question.content.replace(
                                                    /#name/,
                                                    this.state.name
                                                )}
                                            </Typography>

                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                >
                                                    <Box
                                                        display="flex"
                                                        flexDirection="column"
                                                    >
                                                        <Avatar></Avatar>
                                                        <Typography
                                                            style={{
                                                                fontSize:
                                                                    '14px',
                                                                fontFamily:
                                                                    'Source Sans Pro',
                                                                textAlign:
                                                                    'center',
                                                                fontWeight:
                                                                    '800',
                                                            }}
                                                        >
                                                            YOU
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        style={{
                                                            fontSize: '40px',
                                                            fontFamily:
                                                                'Source Sans Pro',
                                                            fontWeight: '800',
                                                            color: comp.getColor(
                                                                comp.getYourAnswer(
                                                                    comp.state
                                                                        .index,
                                                                    question.q_id
                                                                ).content
                                                            ),
                                                            margin: '0 2rem',
                                                            lineHeight: '1',
                                                        }}
                                                    >
                                                        {
                                                            comp.getYourAnswer(
                                                                comp.state
                                                                    .index,
                                                                question.q_id
                                                            ).content
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        style={{
                                                            fontSize: '12px',
                                                            fontFamily:
                                                                'Source Sans Pro',
                                                            fontWeight: '500',
                                                            color: '#262E3F',
                                                        }}
                                                    >
                                                        {
                                                            comp.getYourAnswer(
                                                                comp.state
                                                                    .index,
                                                                question.q_id
                                                            ).comment
                                                        }
                                                    </Typography>
                                                </Box>
                                                {comp
                                                    .getAnswers(
                                                        comp.state.index,
                                                        question.q_id
                                                    )
                                                    .map((answer) => {
                                                        return (
                                                            <Box
                                                                display="flex"
                                                                flexDirection="row"
                                                                style={{
                                                                    margin:
                                                                        '0.5rem 0',
                                                                }}
                                                            >
                                                                <Box
                                                                    display="flex"
                                                                    flexDirection="column"
                                                                >
                                                                    <Avatar></Avatar>
                                                                </Box>
                                                                <Typography
                                                                    style={{
                                                                        fontSize:
                                                                            '40px',
                                                                        fontFamily:
                                                                            'Source Sans Pro',
                                                                        fontWeight:
                                                                            '800',
                                                                        color: comp.getColor(
                                                                            answer.content
                                                                        ),
                                                                        margin:
                                                                            '0 2rem',
                                                                        lineHeight:
                                                                            '1',
                                                                    }}
                                                                >
                                                                    {
                                                                        answer.content
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    style={{
                                                                        fontSize:
                                                                            '12px',
                                                                        fontFamily:
                                                                            'Source Sans Pro',
                                                                        fontWeight:
                                                                            '500',
                                                                        color:
                                                                            '#262E3F',
                                                                    }}
                                                                >
                                                                    {
                                                                        answer.comment
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        );
                                                    })}
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <DialogActions>
                                <Button
                                    onClick={this.handleClose}
                                    color="primary"
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            );
        }
    }
}

export default AOverviewBoard;
