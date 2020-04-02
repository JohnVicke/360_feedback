import React, { Component } from 'react';
import './movie.css';

class Movie extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const movie = this.props.movie;
        return (
            <li className="movie_card" key={movie.id}>
                <div className="card_image">
                    <img src={movie.imgSrc}></img>
                </div>
                <div className="content">
                    <h1>{movie.name}</h1>
                    <p>{movie.desc}</p>
                </div>
                <div className="genre">
                    <ul>
                        {movie.genre.map(genre => (
                            <li>{genre}</li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }
}

export default Movie;
