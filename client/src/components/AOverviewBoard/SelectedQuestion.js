import React, { useEffect, useState, Component } from 'react';
import {
    makeStyles,
    Box,
    Typography,
    Avatar,
    Paper,
    Card,
    CardContent,
    IconButton,
    Button,
    spacing,
    Divider,
} from '@material-ui/core';
import { GetSurveyById, GetUserById } from '../../utils/API';
import ActiveListing from '../Admin/EvaluationListings/ActiveListing';

const useStyles = makeStyles((theme) => ({
    question: {
        maxWidth: 304,
        margin: '0 1em',
        borderRadius: 16,
        backgroundColor: '',

        '&:hover': {
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
        },
        '& .question--subheading': {
            lineHeight: 1.8,
        },
        '& .question--scoreLabel': {
            textAlign: 'right',
        },
        '& .question--root': {
            marginLeft: 3,
            marginRight: 3,
        },
    },
}));

const SelectedQuestion = (props) => {
    const classes = useStyles();

    return (
        <Card
            className={classes.question}
            variant='outlined'
            style={{ backgroundColor: props.backgroundcolor }}
        >
            <CardContent>
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                >
                    <Typography
                        variant='h5'
                        style={{ fontFamily: 'Source Sans Pro' }}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        className={'question--scoreLabel align-items-flex-end'}
                        variant={'h5'}
                        style={{
                            fontFamily: 'Source Sans Pro',
                            marginLeft: '2rem',
                        }}
                    >
                        {props.score}
                    </Typography>
                </Box>

                <Divider className={'question-root'} light />
                <Typography className={'question--subheading'}>
                    {props.answer}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SelectedQuestion; //nice
