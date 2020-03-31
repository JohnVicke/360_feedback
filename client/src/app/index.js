import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './fonts/Bolt Regular.ttf';

import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages'
import StartPage from './StartPage'
import './App.css'


import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
    return (

        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={StartPage}/>
                <Route path="/movies/list" exact component={MoviesList} />
                <Route path="/movies/create" exact component={MoviesInsert} />
                <Route 
                    path="/movies/update/:id"
                    exact 
                    component={MoviesUpdate}
                />
            </Switch>
        </Router>

    )
}

export default App
