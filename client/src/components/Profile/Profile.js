import React, { Fragment, useState, useEffect } from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import api from '../../utils/API';

const Profile = () => {
    const [userInfo, setUserInfo] = useState([]);
    const { loading, user } = useAuth0();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await api.get(`/users/email/${user.email}`);
            console.log(response);

            setUserInfo(response);
        };
        fetchUser();
    }, [user]);

    if (loading || !userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <img src={user.picture} alt='Profile' />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <h1>FUCKING FINALLY --> Fetched via hooks</h1>
            <code>{JSON.stringify(userInfo.data, null, 2)}</code>
            <h2>Fetched from Auth0 --></h2>
            <code>{JSON.stringify(user, null, 2)}</code>
        </Fragment>
    );
};

export default Profile;
