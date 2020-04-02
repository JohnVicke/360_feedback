import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import Movies from '../movies/movies';
import AddMovie from '../addmovie/addmovie';
import About from '../about/about';

import './navbar.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from '../profile/profile';

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <Router>
            <div>
                <div className="toolbar">
                    <nav className="toolbar_nav">
                        <ul className="toolbar_nav_items">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/movies">Movies</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>

                            <li>
                                {!isAuthenticated && (
                                    <button
                                        onClick={() => loginWithRedirect({})}
                                    >
                                        Login!
                                    </button>
                                )}
                                {isAuthenticated && (
                                    <button onClick={() => logout()}>
                                        Logout!
                                    </button>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>

                <Switch>
                    <Route path="/movies">
                        <Movies />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/addmovie">
                        <AddMovie />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default NavBar;
