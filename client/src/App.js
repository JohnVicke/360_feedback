import React, { useState, useEffect } from 'react';
import { useAuth0 } from './react-auth0-spa';
import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import history from './utils/history';
import PrivateRoute from './components/PricateRoutes/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';
import FillEvaluation from './components/FillEvaluation/FillEvaluation';
import MainMenuTabs from './components/Admin/MainMenu/MainMenuTabs';
import NavBar from './components/NavBar/NavBar';
import MainMenu from './components/Admin/MainMenu/MainMenu';
import './assets/fonts/fonts.css';
import Loading from './components/Loading/Loading';
import CreateEvaluation from './components/CreateEvaluation/CreateEvaluation';
import CreateTemplate from './components/CreateTemplate/CreateTemplate';
import AOverviewBoard from './components/AOverviewBoard/AOverviewBoard';
import SelectEvaluatee from './components/CreateEvaluation/SelectEvaluatee';
import SelectTemplate from './components/SelectTemplate/SelectTemplate';
import DoubleCheck from './components/Admin/DoubleCheck/DoubleCheck';
import NoAdminAccess from './components/NoAdminAccess/NoAdminAccess';
import { Box, Button } from '@material-ui/core';
import './AdminPath.css';
import AdminRoute from './components/PricateRoutes/AdminRoutes';
import { IsAdmin } from './utils/API';
import AddUser from './components/Admin/AddUser/AddUser';

function App() {
    const { user, loading, isAuthenticated } = useAuth0();
    const [isAdmin, setIsAdmin] = useState(null);
    const [choice, setChoice] = useState('');

    useEffect(() => {
        const getAdminStatus = async () => {
            setIsAdmin(await IsAdmin(user.email));
        };
        if (user) getAdminStatus();
    }, [user]);

    const handleAdminClick = () => {
        setChoice('/main_menu');
    };

    const handleUserClick = () => {
        setChoice('/profile');
    };

    const AdminPath = () => {
        return (
            <div className='admin-background'>
                <div className='button-container'>
                    <div className='admin' onClick={handleAdminClick}>
                        Continue as admin
                    </div>
                    <div className='user' onClick={handleUserClick}>
                        Continue as user
                    </div>
                </div>
            </div>
        );
    };

    if (loading && isAdmin === null) {
        return <Loading />;
    } else if (!isAuthenticated) {
        return (
            <div>
                <Router history={history}>
                    <LandingPage />
                </Router>
            </div>
        );
    }

    if (choice === '' && isAdmin) return <div>{AdminPath()}</div>;
    else {
        return (
            <div className='App'>
                <Router history={history}>
                    <Switch>
                        {isAdmin !== null
                            ? isAdmin
                                ? history.push(choice)
                                : history.push('/profile')
                            : history.push('/')}
                        <Route exact path='/' component={LandingPage} />
                        <AdminRoute
                            exact
                            path='/main_menu'
                            component={MainMenu}
                            appProps={{ isAdmin }}
                        />
                        <PrivateRoute path='/profile' component={Profile} />
                        <PrivateRoute
                            path='/fillin'
                            component={FillEvaluation}
                        />
                        <AdminRoute
                            appProps={{ isAdmin }}
                            path='/selectEvaluators'
                            component={CreateEvaluation}
                        />
                        <AdminRoute
                            appProps={{ isAdmin }}
                            path='/selectEvaluatee'
                            component={SelectEvaluatee}
                        />
                        <AdminRoute
                            appProps={{ isAdmin }}
                            path='/selectTemplate'
                            component={SelectTemplate}
                        />
                        <AdminRoute
                            appProps={{ isAdmin }}
                            path='/createEvaluation'
                            component={CreateEvaluation}
                        />
                        <AdminRoute
                            appProps={{ isAdmin }}
                            path='/double_check'
                            component={DoubleCheck}
                        />
                        <AdminRoute
                            appProps={{ isAdmin }}
                            path={'/createTemplate'}
                            component={CreateTemplate}
                        />
                        <AdminRoute
                            appProps={{ isAdmin }}
                            path='/admin/overviewboard'
                            component={AOverviewBoard}
                        />
                        <AdminRoute
                            appProps={{ isAdmin }}
                            path='/add_user'
                            component={AddUser}
                        />
                        <Route path='/no_access' component={NoAdminAccess} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
