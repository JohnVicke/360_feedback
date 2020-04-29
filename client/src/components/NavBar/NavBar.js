import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';

import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => loginWithRedirect({})}
                >
                    Log in
                </Button>
            )}

            {isAuthenticated && (
                <Button onClick={() => logout()}>Log out</Button>
            )}
            {isAuthenticated && (
                <span>
                    <Link to='/'>Home</Link>&nbsp;
                    <Link to='/profile'>Profile</Link>
                </span>
            )}
        </div>
    );
};

export default NavBar;
