import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components/test/test';

import NavBar from './components/navbar/navbar';

import { useAuth0 } from './react-auth0-spa';

const App = () => {
    const { loading } = useAuth0();

    if (loading) {
        return <div>loading...</div>;
    } else {
        return (
            <header>
                <NavBar />
            </header>
        );
    }
};

export default App;
