import React, { Component } from 'react';
import './test.css';
import Movie from '../movie/movie';
import ReactLoading from 'react-loading';

class Test extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            loaded: false
        };
    }

    /*
        TODO: 
            - Get poster from www.themoviedb.org
            - API-key: https://api.themoviedb.org/3/movie/550?api_key=718e5c582a8e8b447d6719ed4f29c2d3
            - https://api.themoviedb.org/3/find/tt0111161?api_key=https://api.themoviedb.org/3/movie/550?api_key=718e5c582a8e8b447d6719ed4f29c2d3&external_source=imdb_id
            - Retrieve the poster from "poster_path"
            - prepend it with: http://image.tmdb.org/t/p/original
            - use it as Zorge
            
              getPoster = async (id, type) => {
        let res = await fetch(
            `https://api.themoviedb.org/3/find/${id}?api_key=   &external_source=imdb_id`
        );
        let data = await res.json();
        let path = 'http://image.tmdb.org/t/p/original';
        if (type === 'movie') {
            path += data.movie_results[0].poster_path;
        } else {
            path += data.tv_results[0].poster_path;Sedan
        }
        return path;
    };
    */

    deleteMovie = async id => {
        const reqOptions = {
            method: 'DELETE'
        };
        let res = await fetch(`/api/posts/${id}`, reqOptions);
        let data = await res.json();
        return data;
    };

    getMovies = async () => {
        let res = await fetch('/api/posts');
        let data = await res.json();
        return data;
    };

    async componentDidMount() {
        const movies = await this.getMovies();
        movies.map(movie => {
            movie.imgSrc = 'http://image.tmdb.org/t/p/original/' + movie.imgSrc;
            console.log(movie.imgSrc);
        });
        this.setState({ movies }, () =>
            console.log('Test data fetched', movies)
        );
        this.setState({ loaded: true });
    }

    render() {
        // Sicko mode
        const { movies, loaded } = this.state;

        if (!loaded) {
            return (
                <div className="test">
                    <ReactLoading
                        type={'bubbles'}
                        color={'#ffffff'}
                        height={'10%'}
                        width={'100%'}
                    />
                </div>
            );
        }
        return (
            <div>
                <ul>
                    {movies.map(m => (
                        <Movie movie={m} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Test;
