import React, { useEffect, useState } from 'react';
import { useAuth0 } from './react-auth0-spa';

import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import history from './utils/history';
import PrivateRoute from './components/PricateRoutes/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import './assets/fonts/fonts.css';
import { helloWorld } from './utils/API';

function App() {
    const { loading, isAuthenticated } = useAuth0();
    const [loaded, setLoaded] = useState();

    useEffect(() => {
        setLoaded([helloWorld()]);
    });

    if (!isAuthenticated) {
        return (
            <div>
                <LandingPage />
            </div>
        );
    }
    return (
        <div className='App'>
            <Router history={history}>
                <NavBar />
                <Switch>
                    <Route path='/' component={Profile} />
                    <PrivateRoute path='/profile' component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
