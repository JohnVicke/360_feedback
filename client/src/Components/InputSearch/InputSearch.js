import React, { Component } from 'react';
import './inputsearch.css';

class InputSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const FontAwesome = require('react-fontawesome');

        return (
            <div className="input-container">
                <FontAwesome className="icon" name="search" size="5px" />
                <input
                    className="input-field"
                    type="text"
                    placeholder="Search..."
                ></input>
            </div>
        );
    }
}

export default InputSearch;
