import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import { GetUserByEmail, GetUserEvals, getTemplate } from '../../utils/API';
import { makeStyles, Box, Typography, Avatar } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import ContributionPoints from './ContributionPoints/ContributionPoints';
import EvaluationWaiting from './EvaluationWaiting/EvaluationWaiting';
import happy from '../../assets/misc/emoji-happy.svg';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const useStyles = makeStyles({
    profile: {
        height: '100%',
        minHeight: '100vh',
        background: 'rgb(126,231,119)',
        background:
            'linear-gradient(45deg, rgba(126,231,119,1) 0, rgba(14,17,24,1) 0%, rgba(38,46,63,1) 100%)',
    },

    avatar: {
        height: 120,
        width: 120,
    },
});

const Profile = () => {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState([]);
    const [userEvals, setUserEvals] = useState([]);
    const { loading, user } = useAuth0();

    const evalComponent = () => {
        if (userEvals !== 'null') {
            return (
                <Box display='flex' flexDirection='row'>
                    {userEvals.map((submissionUser) => (
                        <div style={{ paddingRight: '2rem' }}>
                            <Link
                                to={{
                                    pathname: '/fillin',
                                    state: {
                                        fromProfile: submissionUser,
                                        myId: userInfo.data._id,
                                    },
                                }}
                                style={{ textDecoration: 'none' }}
                            >
                                <EvaluationWaiting
                                    userPic={submissionUser.user_data.picture}
                                    name={`${submissionUser.user_data.given_name} ${submissionUser.user_data.family_name}`}
                                    role={submissionUser.user_data.role}
                                />
                            </Link>
                        </div>
                    ))}
                </Box>
            );
        } else {
            return (
                <Box display='flex' flexDirection='row'>
                    <img
                        src={happy}
                        style={{
                            height: '90px',
                            width: '90px',
                            marginRight: '2rem',
                        }}
                    />
                    <Typography
                        style={{
                            fontFamily: 'Source Sans pro',
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#fff',
                        }}
                    >
                        You have no evaluations
                        <br /> waiting, good job!
                    </Typography>
                </Box>
            );
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await GetUserByEmail(user.email);
            setUserInfo(response);
        };
        fetchUser();
    }, [user]);

    useEffect(() => {
        const fetchEval = async () => {
            let resArray = [];
            const requests = userInfo.data.responses.map(async (response) => {
                const res = await GetUserEvals(response.user_id);
                const template = await getTemplate(response.survey_id);
                resArray.push({
                    template: template.data,
                    answers: response,
                    user_data: res.data,
                });
            });
            Promise.all(requests).then(() => {
                setTimeout(() => {
                    setUserEvals(resArray);
                }, 1000);
            });
        };
        if (userInfo.length !== 0) {
            if (userInfo.data.responses.length !== 0) {
                fetchEval();
            } else {
                setUserEvals('null');
            }
        }
    }, [userInfo]);

    if (loading || userEvals.length === 0) {
        return <Loading fullscreen={true} />;
    }

    return (
        <div className={classes.profile}>
            <NavBar />
            <Box
                display='flex'
                flexDirection='column'
                style={{ padding: '2rem 6rem' }}
            >
                <Typography
                    style={{
                        fontFamily: 'Source Sans pro',
                        color: '#fff',
                        fontSize: '28px',
                        fontWeight: '400',
                        marginBottom: '2rem',
                    }}
                >
                    My profile
                </Typography>
                <Box display='flex' flexDirection='row' alignItems='center'>
                    <Avatar
                        src={user.picture}
                        className={classes.avatar}
                        width='120px'
                        height='120px'
                    />
                    <Box
                        display='flex'
                        flexDirection='row'
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
                            {user.name + ','}
                        </Typography>
                        <Typography
                            style={{
                                fontFamily: 'Source Sans pro',
                                color: '#fff',
                                fontSize: '38px',
                                fontWeight: '700',
                            }}
                        >
                            {userInfo.data.role}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    style={{
                        fontFamily: 'Source Sans pro',
                        fontSize: '28px',
                        margin: '2rem 0',
                        color: '#fff',
                    }}
                >
                    Evaluations waiting for submission
                </Typography>
                {evalComponent()}
                <Typography
                    style={{
                        fontFamily: 'Source Sans pro',
                        fontSize: '28px',
                        margin: '2rem 0',
                        color: '#fff',
                    }}
                >
                    Overall Contribution Points
                </Typography>
                <ContributionPoints />
            </Box>
        </div>
    );
};

export default Profile;
