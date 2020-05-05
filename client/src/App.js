import React from 'react';
import { useAuth0 } from './react-auth0-spa';
import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import history from './utils/history';
import PrivateRoute from './components/PricateRoutes/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';
import './assets/fonts/fonts.css';
import Scale from './components/FillEvaluation/Scale';

function App() {
    const { loading, isAuthenticated } = useAuth0();

    if (loading) {
        return <div>loading...</div>;
    } else if (!isAuthenticated) {
        return (
            <div>
                <Scale />
            </div>
        );
    }
    return (
        <div className='App'>
            <Router history={history}>
                <Switch>
                    <Route path='/' component={Profile} />
                    <PrivateRoute path='/profile' component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
