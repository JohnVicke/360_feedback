import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import { GetUserByEmail } from '../../utils/API';
import { makeStyles, Box, Typography, Avatar } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import ContributionPoints from './ContributionPoints/ContributionPoints';
import EvaluationWaiting from './EvaluationWaiting/EvaluationWaiting';

const useStyles = makeStyles({
    profile: {
        height: '100vh',
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
    const { loading, user } = useAuth0();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await GetUserByEmail(user.email);
            console.log(response);
            setUserInfo(response);
        };

        fetchUser();
    }, [user]);

    if (loading || !userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.profile}>
            <NavBar />
            <Box display='flex' flexDirection='column'>
                <Typography variant='h4'>My profile</Typography>
                <Box display='flex' flexDirection='row' alignItems='center'>
                    <Avatar
                        src={user.picture}
                        className={classes.avatar}
                        width='120px'
                        height='120px'
                    />
                    <Typography variant='h3'>{user.name}</Typography>
                </Box>
                <EvaluationWaiting
                    userPic={user.picture}
                    name={user.name}
                    role='Software Developer'
                />
                <ContributionPoints />
            </Box>
        </div>
    );
};

export default Profile;
