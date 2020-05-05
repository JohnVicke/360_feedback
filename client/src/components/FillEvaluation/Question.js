import React, { Component } from 'react';
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
    transition: 'ease-in-out 0.2s',
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
        };
    }

    handleAddComment = async (event) => {
        this.setState({ comment: true });
    };
    handleRemoveComment = async (event) => {
        this.setState({ comment: false });
    };
    render() {
        var comp = this;
        function Comment(props) {
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
                            InputProps={{
                                style: {
                                    color: 'white',
                                    fontFamily: 'Source Sans Pro',
                                },
                            }}
                        >
                            Type
                        </TextField>
                    </Box>
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
                        1/2
                    </Typography>
                    <Typography
                        style={{
                            fontFamily: 'Source Sans pro',
                            fontSize: '24px',
                            fontWeight: '500',
                            marginTop: '2rem',
                        }}
                    >
                        How Accountable is Viktor?
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
                        This is a description of the question,
                        <br />
                        How good would you rate Viktor being accountable for his
                        work?
                    </Typography>
                    <Comment comment={comp.state.comment} />

                    <Box
                        style={{
                            width: '50%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '4rem',
                        }}
                    >
                        <ContinueButton style={{ float: 'right' }}>
                            Continue
                        </ContinueButton>
                        <BackButton style={{ float: 'left' }}>Back</BackButton>
                    </Box>
                </MyCard>
            </Box>
        );
    }
}

export default Question;
