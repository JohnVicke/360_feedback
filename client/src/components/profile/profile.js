import React, { Fragment } from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import './profile.css';

const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <Fragment>
                <img src={user.picture} alt="Profile" />

                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <code>{JSON.stringify(user, null, 2)}</code>
            </Fragment>
        </div>
    );
};

export default Profile;
