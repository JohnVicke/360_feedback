import React from 'react';
import { useAuth0 } from './react-auth0-spa';

import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import history from './utils/history';
import PrivateRoute from './components/PricateRoutes/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';
import './assets/fonts/fonts.css';


function App() {
    const { loading } = useAuth0();

    if (loading) {
        return <div>loading...</div>;
    }
    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <PrivateRoute path="/profile" component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
