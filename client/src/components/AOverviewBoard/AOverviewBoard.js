import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
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
    Avatar,
    makeStyles,
} from '@material-ui/core';
import ConPoints from './ConPoints';

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
            templateName: 'May Evaluation',
            userId: 1,
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
                                content: 3,
                                comment: 'Average',
                            },
                            { q_id: 2, s_id: 1, content: 4, comment: 'good!' },
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
    render() {
        const comp = this;
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
                    <Box display="flex" flexDirection="row" alignItems="center">
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
                    <ConPoints component={comp} />
                </div>
            </div>
        );
    }
}

export default AOverviewBoard;
