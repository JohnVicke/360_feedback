import React, { Component } from 'react';
import './ads.css';

class Ads extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const FontAwesome = require('react-fontawesome');

        return (
            <div className="ads-comp-container">
                <div className="ads-options">
                    <div className="radio-container">
                        <div className="radio">
                            <label className="container">Company</label>
                            <input type="checkbox" />
                            <span class="checkmark" />
                        </div>
                        <div className="radio">
                            <label className="container">Private</label>
                            <input type="checkbox" />
                            <span class="checkmark" />
                        </div>
                    </div>
                    <div className="filter">
                        <p>Filter by</p>
                    </div>
                </div>
                <div className="ads-container">
                    <div>
                        <ul>
                            <li>Ad</li>
                            <li>Ad</li>
                            <li>Ad</li>
                            <li>Ad</li>
                            <li>Ad</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ads;
