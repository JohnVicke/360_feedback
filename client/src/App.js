import React from 'react';
import { useAuth0 } from './react-auth0-spa';
import { Router, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import history from './utils/history';
import PrivateRoute from './components/PricateRoutes/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';
import FillEvaluation from './components/FillEvaluation/FillEvaluation';
import MainMenu from './components/Admin/MainMenu/MainMenu';
import './assets/fonts/fonts.css';
import Loading from './components/Loading/Loading';
import CreateEvaluation from './components/CreateEvaluation/CreateEvaluation';
import CreateTemplate from './components/CreateTemplate/CreateTemplate';
import AOverviewBoard from './components/AOverviewBoard/AOverviewBoard';
import SelectEvaluatee from './components/CreateEvaluation/SelectEvaluatee';
import SelectTemplate from './components/SelectTemplate/SelectTemplate';
import DoubleCheck from './components/Admin/DoubleCheck/DoubleCheck';

function App() {
    const { loading, isAuthenticated } = useAuth0();

    if (loading) {
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
    return (
        <div className='App'>
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path='/' component={MainMenu} />
                    <PrivateRoute path='/profile' component={Profile} />
                    <PrivateRoute path='/fillin' component={FillEvaluation} />
                    <PrivateRoute
                        path='/selectEvaluators'
                        component={CreateEvaluation}
                    />
                    <PrivateRoute
                        path='/selectEvaluatee'
                        component={SelectEvaluatee}
                    />
                    <PrivateRoute
                        path='/selectTemplate'
                        component={SelectTemplate}
                    />
                    <PrivateRoute
                        path='/createEvaluation'
                        component={CreateEvaluation}
                    />
                    <PrivateRoute
                        path='/double_check'
                        component={DoubleCheck}
                    />
                    <PrivateRoute exact path='/' component={MainMenu} />
                    <PrivateRoute path='/profile' component={Profile} />
                    <PrivateRoute path='/fillin' component={FillEvaluation} />
                    <PrivateRoute
                        path='/createEvaluation'
                        component={CreateEvaluation}
                    />
                    <PrivateRoute
                        path={'/createTemplate'}
                        component={CreateTemplate}
                    />
                    <PrivateRoute
                        path='/admin/overviewboard'
                        component={AOverviewBoard}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
