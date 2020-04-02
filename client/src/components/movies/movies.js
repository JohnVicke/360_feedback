import React from 'react';
import Test from '../test/test';
import './movies.css';
import Button from '../button/button';

function Movies() {
    return (
        <div className="movies">
            <Test />
            <div className="button">
                <Button />
            </div>
        </div>
    );
}

export default Movies;
