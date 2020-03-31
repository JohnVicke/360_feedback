import React, { Component } from 'react'
import './App.css';

class StartPage extends Component {
    render() {
        return (

            <div className="startpage-background">
                <img className="first-image" src="https://www.panoramaaudiovisual.com/wp-content/uploads/2019/06/IMDB.jpg" alt="imdb"/>
                <p className="startpage-text1">YOUR</p>
                <p className="startpage-text2">WORST MOVIES</p>
                <p className="startpage-text1">OF ALL TIME</p>

            </div>
        )
    }
}

export default StartPage