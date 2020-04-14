import React from 'react';
import logo from './logo.svg';
import Test from './components/test/test';
import NavBar from './components/NavBar/NavBar';
import { useAuth0 } from './react-auth0-spa';

import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import history from './utils/history';
import PrivateRoute from './components/PricateRoutes/PrivateRoute';

function App() {
    const { loading } = useAuth0();

    if (loading) {
        return <div>loading...</div>;
    }
    return (
        <div className="App">
            <Router history={history}>
                <header className="App-header">
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact />
                    <PrivateRoute path="/profile" componet={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
