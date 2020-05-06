import React from 'react';
import { useAuth0 } from './react-auth0-spa';
import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import history from './utils/history';
import PrivateRoute from './components/PricateRoutes/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';
import FillEvaluation from './components/FillEvaluation/FillEvaluation';
import './assets/fonts/fonts.css';

function App() {
    const { loading, isAuthenticated } = useAuth0();

    if (loading) {
        return <div>loading...</div>;
    } else if (!isAuthenticated) {
        return (
            <div>
                <LandingPage />
            </div>
        );
    }
    return (
        <div className='App'>
            <Router history={history}>
                <Switch>
                    <PrivateRoute path='/' component={Profile} />
                    <PrivateRoute path='/profile' component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
