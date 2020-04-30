import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import { GetUserByEmail } from '../../utils/API';
import { makeStyles } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';

const useStyles = makeStyles({
    profile: {
        height: '100vh',
        background: 'rgb(126,231,119)',
        background:
            'linear-gradient(45deg, rgba(126,231,119,1) 0, rgba(14,17,24,1) 0%, rgba(38,46,63,1) 100%)',
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
            <img src={user.picture} alt='Profile' />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <h1>FUCKING FINALLY --> Fetched via hooks</h1>
            <code>{JSON.stringify(userInfo.data, null, 2)}</code>
            <h2>Fetched from Auth0 --></h2>
            <code>{JSON.stringify(user, null, 2)}</code>
        </div>
    );
};

export default Profile;
