import React, { useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    Avatar,
    TextField,
    Grow,
    IconButton,
    Button,
} from '@material-ui/core';
import NavBar from '../../NavBar/NavBar';
import { Assignment } from '@material-ui/icons';
import history from '../../../utils/history';
import Submitted from '../../FillEvaluation/Submit/Submitted';

const DoubleCheck = (props) => {
    const users = props.location.state;
    const [send, setSend] = useState(false);
    function EmployeeList(props) {
        return (
            <ul style={{ width: '95%', listStyleType: 'none' }}>
                {props.users.map((user) => {
                    return (
                        <li key={user._id}>
                            <EmployeeBar user={user} />
                        </li>
                    );
                })}
            </ul>
        );
    }

    function EmployeeBar(props) {
        return (
            <Box
                className='employeeBar'
                bgcolor='#F6F6F6'
                width={props.reviewed ? '500px' : '0.95'}
                style={{
                    borderRadius: '15px',
                    marginTop: '15px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                }}
            >
                <div>
                    {/*console.log(props)*/}
                    <Grid container>
                        <Grid item xs={8}>
                            <Avatar
                                src={props.user.picture}
                                style={{
                                    float: 'left',
                                    margin: '15px',
                                    width: '60px',
                                    height: '60px',
                                }}
                            />

                            <Typography
                                variant='h5'
                                style={{
                                    paddingTop: '10px',
                                    fontFamily: 'Source Sans Pro',
                                    fontWeight: 'bold',
                                }}
                                color='#000000'
                            >
                                {props.user.given_name +
                                    ' ' +
                                    props.user.family_name}
                            </Typography>
                            <Typography
                                variant='h6'
                                style={{
                                    opacity: '0.7',
                                    marginTop: '2px',
                                    fontFamily: 'Source Sans Pro',
                                    fontWeight: 'bold',
                                }}
                                color='#131313'
                            >
                                {props.user.role}
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <div
                                style={{
                                    float: 'right',
                                    margin: '15px',
                                    paddingRight: '20px',
                                    paddingTop: '6px',
                                }}
                            ></div>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        );
    }

    return (
        <div className='background'>
            <NavBar />
            {send && (
                <div className='submitted-margin'>
                    <Submitted
                        header='Evaluation sent!'
                        subHeader={`Sent evaluation to ${users.length} evaluators`}
                        button={{
                            name: 'Home',
                            func: () => history.push('/'),
                        }}
                    />
                </div>
            )}

            {!send && (
                <Grow in={true}>
                    <Container>
                        <Grid
                            direction='row'
                            container
                            justify='center'
                            alignItems='center'
                        >
                            <Box color='#FFFFFF'>
                                <Typography variant='h6' color='#FFFFFF'>
                                    CREATING EVALUATION
                                </Typography>
                            </Box>
                        </Grid>
                        <Box className='mainBox' bgcolor='#222222'>
                            <Grid
                                className='innerGrid'
                                container
                                direction='column'
                                justify='flex-start'
                                height='100vh'
                            >
                                <Box color='#FFFFFF'>
                                    <Typography
                                        variant='h6'
                                        color='#FFFFFF'
                                        style={{
                                            fontFamily: 'Source Sans Pro',
                                            fontWeight: 'bolder',
                                        }}
                                    >
                                        Doublecheck
                                    </Typography>

                                    <hr />
                                </Box>

                                <Box
                                    className='employees'
                                    bgcolor='#0F121F'
                                    overflow='auto'
                                >
                                    <Typography
                                        variant='h6'
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'Source Sans Pro',
                                            color: '#fff',
                                            letterSpacing: '2px',
                                        }}
                                    >
                                        Getting Reviewed
                                    </Typography>
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        justifyItems='center'
                                        alignItems='center'
                                    >
                                        <Box
                                            display='flex'
                                            flexDirection='row'
                                            justifyItems='bottom'
                                        >
                                            <Box
                                                style={{ margin: '1rem' }}
                                                display='flex'
                                                flexDirection='column'
                                                alignItems='top'
                                                justifyContent='center'
                                            >
                                                <Assignment
                                                    style={{
                                                        height: 100,
                                                        width: 100,
                                                        marginRight: '0.5em',
                                                        color: '#fff',
                                                    }}
                                                />
                                                <Typography
                                                    variant='h6'
                                                    style={{
                                                        fontFamily:
                                                            'Source Sans Pro',
                                                        color: '#fff',
                                                    }}
                                                >
                                                    {/* props.template.name*/}
                                                    360 feedback
                                                </Typography>
                                            </Box>
                                            <div style={{ marginLeft: '1rem' }}>
                                                <EmployeeBar
                                                    reviewed={true}
                                                    user={users[0]}
                                                    container
                                                    direction='row'
                                                    justify='center'
                                                    alignItems='flex-start'
                                                />
                                            </div>
                                        </Box>
                                    </Box>
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        justifyItems='center'
                                        alignItems='center'
                                    >
                                        <Typography
                                            variant='h6'
                                            style={{
                                                marginTop: '1rem ',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeigth: '700',
                                                color: '#fff',
                                                letterSpacing: '2px',
                                            }}
                                        >
                                            Evaluators:{' '}
                                            <span style={{ color: '#4392FE' }}>
                                                {users.length} Selected
                                            </span>
                                        </Typography>
                                        <EmployeeList users={users} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid
                                container
                                style={{
                                    marginTop: '40px',
                                    paddingLeft: '50px',
                                    paddingRight: '50px',
                                }}
                            >
                                <Grid item xs={6}>
                                    <Button
                                        variant='outlined'
                                        style={{
                                            borderRadius: '20px',
                                            color: '#F5F5F5',
                                            borderColor: '#4392FE',
                                        }}
                                    >
                                        <Typography
                                            variant='button'
                                            onClick={() => history.goBack()}
                                        >
                                            BACK
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant='contained'
                                        style={{
                                            float: 'right',
                                            backgroundColor: '#4392FE',
                                            color: '#FFFFFF',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        <Typography
                                            variant='button'
                                            onClick={() => setSend(true)}
                                        >
                                            Send
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Grow>
            )}
        </div>
    );
};

export default DoubleCheck;
