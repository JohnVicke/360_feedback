import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AdminRoute({ component: C, appProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                appProps.isAdmin ? (
                    <C {...props} {...appProps} />
                ) : (
                    <Redirect to={'/no_access'} />
                )
            }
        />
    );
}
