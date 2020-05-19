import React from 'react';
import { Button, Avatar, makeStyles, SvgIcon } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { GetUserEvals } from '../../../utils/API';
const useStyles = makeStyles({
    avatar: {
        marginRight: '1rem',
        height: 50,
        width: 50,
    },
});

const MyButton = styled(Button)({
    background: '#EEEEEE',
    border: 0,
    borderRadius: 3,
    color: 'black!important',
    height: 96,
    padding: '0 20px',
    transition: 'ease-in-out 0.2s',

    '&:hover': {
        backgroundColor: '#EEEEEE',
        color: 'black',
        transform: 'scale(1.1)',
    },
    '& h1': {
        color: '#262E3F',
        padding: 0,
        margin: 0,
        textTransform: 'none',
        fontSize: 17,
        textAlign: 'left',
        fontFamily: 'Source Sans Pro',
        fontWeight: 600,
        lineHeight: 1.3,
    },
    '& h2': {
        color: '#262E3F',
        padding: 0,
        margin: 0,
        textTransform: 'none',
        fontSize: 17,
        textAlign: 'left',
        fontFamily: 'Source Sans Pro',
        fontWeight: 800,
        lineHeight: 1.3,
    },
});

const EvaluationWaiting = (props) => {
    const pic = props.userPic;
    const name = props.name;
    const role = props.role;
    const userId = props.userId;
    const classes = useStyles();

    return (
        <div>
            <MyButton>
                <Avatar src={pic} className={classes.avatar} />
                <div>
                    <h1>{name}</h1>
                    <h2>{role}</h2>
                </div>
                <ArrowForwardIosIcon style={{ marginLeft: '2rem' }} />
            </MyButton>
        </div>
    );
};

export default EvaluationWaiting;
