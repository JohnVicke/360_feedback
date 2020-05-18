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
    Checkbox,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ConPoints from './ConPoints';
import { GetSurveyById, GetUserById } from '../../utils/API';
import Loading from '../Loading/Loading';
import './AOverviewBoard.css';

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
            user: {
                given_name: 'Isak',
                family_name: 'Larsson',
                picture:
                    'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
                role: 'Role',
            },
            name: 'Isak',
            fullName: 'Isak Larsson',
            picture:
                'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
            role: 'Role',
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
            selectedQuestions: [],
            showSelect: false,
        };
    }

    componentDidMount = async () => {
        //const { surveyId } = this.props.location.state;
        const surveyId = '5eba8593ff1b10be56b09465';

        console.log(surveyId);
        const res = await (await GetSurveyById(surveyId)).data;
        const user = await (await GetUserById(res.e_id)).data;

        this.setState({
            userId: res.e_id,
            survey: res,
            user: user,
            surveyId: surveyId,
        });
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
    handleSelectedOpen = () => {
        this.setState({ showSelect: true });
    };
    handleSelectedClose = () => {
        this.setState({ showSelect: false });
    };
    handleCheckbox = (content, score, comment, qId, sId) => {
        var found = false;
        var selected = this.state.selectedQuestions;
        for (var i = 0; i < selected.length; i++) {
            if (
                selected[i].qId === qId &&
                selected[i].sId === sId &&
                selected[i].score === score &&
                selected[i].comment === comment
            ) {
                found = true;
                selected.splice(i, 1);
            }
        }
        if (!found) {
            selected.push({
                content: content,
                score: score,
                comment: comment,
                qId: qId,
                sId: sId,
            });
        }
        console.log(selected);
        this.setState({ selectedQuestions: selected });
    };
    getColor = (x) => {
        var color = '';
        if (x >= 4) color = '#5ABE41';
        else if (x === 3) color = '#FFB400';
        else color = '#FE0642';
        return color;
    };
    getYourAnswer = (index, questionId) => {
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
            return <Loading />;
        } else {
            return (
                <div>
                    <div className="background">
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
                                src={this.state.user.picture}
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
                                    {this.state.user.given_name +
                                        ' ' +
                                        this.state.user.family_name +
                                        ', '}
                                </Typography>
                                <Typography
                                    style={{
                                        fontFamily: 'Source Sans pro',
                                        color: '#fff',
                                        fontSize: '38px',
                                        fontWeight: '700',
                                    }}
                                >
                                    {this.state.user.role}
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
                                                                color:
                                                                    '#262E3F',
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
                            Selected questions{' '}
                            <EditIcon
                                className="test"
                                style={{ margin: '0 1rem' }}
                                onClick={this.handleSelectedOpen}
                            />
                        </Typography>
                        <Dialog
                            open={this.state.showSelect}
                            TransitionComponent={this.Transition}
                            keepMounted
                            onClose={this.handleSelectedClose}
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
                                Choose selected questions
                            </Typography>
                            <Box
                                display="flex"
                                flexWrap="wrap"
                                alignContent="space-between"
                                margin="0 3rem"
                            >
                                {this.state.template.sections.map(
                                    (section, index) => {
                                        return section.questions.map(
                                            (question) => {
                                                console.log('INDEX');
                                                console.log(index);
                                                return (
                                                    <Box
                                                        maxWidth="400px"
                                                        style={{
                                                            margin:
                                                                '0 3rem 0 3rem',
                                                        }}
                                                    >
                                                        <Typography
                                                            style={{
                                                                fontSize:
                                                                    '18px',
                                                                textAlign:
                                                                    'Left',
                                                                fontFamily:
                                                                    'Source Sans Pro',
                                                                fontWeight:
                                                                    '600',
                                                                color:
                                                                    '#262E3F',
                                                                margin:
                                                                    '0 0 1rem 0 ',
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
                                                                <Checkbox
                                                                    color="primary"
                                                                    inputProps={{
                                                                        'aria-label':
                                                                            'secondary checkbox',
                                                                    }}
                                                                    onChange={() => {
                                                                        comp.handleCheckbox(
                                                                            question.content.replace(
                                                                                /#name/,
                                                                                this
                                                                                    .state
                                                                                    .name
                                                                            ),
                                                                            comp.getYourAnswer(
                                                                                index,
                                                                                question.q_id
                                                                            )
                                                                                .content,
                                                                            comp.getYourAnswer(
                                                                                index,
                                                                                question.q_id
                                                                            )
                                                                                .comment,
                                                                            question.q_id,
                                                                            question.s_id
                                                                        );
                                                                    }}
                                                                />
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
                                                                            color:
                                                                                '#262E3F',
                                                                        }}
                                                                    >
                                                                        YOU
                                                                    </Typography>
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
                                                                            comp.getYourAnswer(
                                                                                index,
                                                                                question.q_id
                                                                            )
                                                                                .content
                                                                        ),
                                                                        margin:
                                                                            '0 2rem',
                                                                        lineHeight:
                                                                            '1',
                                                                    }}
                                                                >
                                                                    {
                                                                        comp.getYourAnswer(
                                                                            index,
                                                                            question.q_id
                                                                        )
                                                                            .content
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
                                                                        comp.getYourAnswer(
                                                                            index,
                                                                            question.q_id
                                                                        )
                                                                            .comment
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            {comp
                                                                .getAnswers(
                                                                    index,
                                                                    question.q_id
                                                                )
                                                                .map(
                                                                    (
                                                                        answer
                                                                    ) => {
                                                                        return (
                                                                            <Box
                                                                                display="flex"
                                                                                flexDirection="row"
                                                                                style={{
                                                                                    margin:
                                                                                        '0.5rem 0',
                                                                                }}
                                                                            >
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    inputProps={{
                                                                                        'aria-label':
                                                                                            'secondary checkbox',
                                                                                    }}
                                                                                    onChange={() => {
                                                                                        comp.handleCheckbox(
                                                                                            question.content.replace(
                                                                                                /#name/,
                                                                                                this
                                                                                                    .state
                                                                                                    .name
                                                                                            ),
                                                                                            answer.content,
                                                                                            answer.comment,
                                                                                            question.q_id,
                                                                                            question.s_id
                                                                                        );
                                                                                    }}
                                                                                />
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
                                                                    }
                                                                )}
                                                        </Box>
                                                    </Box>
                                                );
                                            }
                                        );
                                    }
                                )}
                            </Box>

                            <DialogActions>
                                <Button
                                    style={{
                                        backgroundColor: '#4392FE',
                                        color: 'white',
                                        fontSize: '13px',
                                    }}
                                    onClick={comp.handleSelectedClose}
                                >
                                    Finish editing
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
