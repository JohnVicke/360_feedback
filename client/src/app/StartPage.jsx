import React, { Component } from 'react'
import * as _ from 'lodash';
import './App.css';
import api from '../api';


class StartPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            worstMovie: '',
        }
    }

    componentDidMount = async () => {
        var movie = await api.getAllMovies();
        movie = _.orderBy(movie.data.data, "rating");

        const worstMovie = _.head(movie).name;
        this.setState({worstMovie});
        console.log(worstMovie.name);
        
    }


    render() {
        return (

            <div className="startpage-background">
                <img className="first-image" src="https://www.panoramaaudiovisual.com/wp-content/uploads/2019/06/IMDB.jpg" alt="imdb"/>
                <p className="startpage-text1">YOUR WORST MOVIE</p>
                <p className="startpage-text2">{this.state.worstMovie}</p>

            </div>
        )
    }
}

export default StartPage