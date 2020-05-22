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
import AdminNavBar from '../../AdminNavBar/AdminNavBar';
import { Assignment } from '@material-ui/icons';
import history from '../../../utils/history';
import Submitted from '../../FillEvaluation/Submit/Submitted';
import {
    CreateEmptySurvey,
    UpdateSurvey,
    GetUserById,
    UpdateUserResponses,
} from '../../../utils/API';

const DoubleCheck = (props) => {
    const { user, template, users } = props.location.state;
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

    const handleSend = async () => {
        // create empty survey first
        const res = await CreateEmptySurvey({
            active: true,
            created_date: new Date(),
            end_date: new Date(),
            responses: [],
        });

        const {
            data: { id },
        } = res;
        // fill survey with this info ==>

        let survey = {
            creator: user._id, // Set creator to auth0 userid in database
            active: true,
            e_id: user._id,
            created_date: new Date(),
            end_date: '2020-04-06T22:00:00.000Z',
            template_id: template._id,
            responses: users.map((u) => {
                return {
                    user_id: u._id,
                    survey_id: id,
                    answers: [],
                };
            }),
        };
        const updatedSurvey = await UpdateSurvey(id, survey);
        users.map(async (u) => {
            let dataUser = await (await GetUserById(u._id)).data;
            let userResponses = dataUser.responses;
            userResponses.push({
                user_id: user._id,
                survey_id: id,
                answers: [],
            });
            await UpdateUserResponses(u._id, { responses: userResponses });
        });

        setSend(true);
    };

    function EmployeeBar(props) {
        return (
            <Box
                className='employeeBar'
                bgcolor='#F6F6F6'
                width={props.reviewed ? '500px' : '0.97'}
                style={{
                    borderRadius: '15px',
                    marginTop: '15px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                }}
            >
                <div>
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
            <AdminNavBar />
            {send && (
                <div className='submitted-margin'>
                    <Submitted
                        header={`${template.name} evaluation for ${user.given_name} ${user.family_name}`}
                        subHeader={`The evaluation was sent to ${users.length} evaluators`}
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
                            <Box
                                color='#FFFFFF'
                                width={1}
                                style={{ margin: '1rem 0' }}
                                textAlign='center'
                            >
                                <Typography
                                    style={{
                                        color: '#fff',
                                        textAlign: 'center',
                                        fontSize: '24px',
                                        fontFamily: 'Source Sans Pro',
                                        fontWeight: '400',
                                        textTransform: 'uppercase',
                                        marginTop: '0.5rem',
                                    }}
                                >
                                    <strong>CREATING EVALUATION:</strong> Double
                                    check
                                    <hr />
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
                                <Box
                                    className='employees'
                                    bgcolor='#222222'
                                    overflow='auto'
                                    height='70vh'
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
                                                    {template.name}
                                                </Typography>
                                            </Box>
                                            <div style={{ marginLeft: '1rem' }}>
                                                <EmployeeBar
                                                    reviewed={true}
                                                    user={user}
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
                                    marginTop: '20px',
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
                                            onClick={() => handleSend()}
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
