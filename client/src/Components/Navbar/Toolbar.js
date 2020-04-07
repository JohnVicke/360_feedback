import React, { Component } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import InputSearch from '../InputSearch/InputSearch';

import './navbar.css';

class Toolbar extends Component {
    constructor() {
        super();
        this.state = {
            location: [
                {
                    id: 0,
                    title: 'Fordon',
                    selected: false,
                    key: 'location',
                },
                {
                    id: 1,
                    title: 'Möbler',
                    selected: false,
                    key: 'location',
                },
                {
                    id: 2,
                    title: 'Fritid',
                    selected: false,
                    key: 'location',
                },
                {
                    id: 3,
                    title: 'Tech',
                    selected: false,
                    key: 'location',
                },
            ],
        };
    }

    toggleSelected(id, key) {
        let temp = this.state[key];
        temp[id].selected = !temp[id].selected;
        this.setState({
            [key]: temp,
        });
    }

    resetSelected() {
        this.state.location.map((i) => (i.selected = false));
    }

    toggleSelected = this.toggleSelected.bind(this);

    render() {
        const FontAwesome = require('react-fontawesome');

        return (
            <header>
                <nav>
                    <div className="logo-wrapper">
                        <img className="logo" src="./logo.svg" alt=""></img>
                        <p className="ad">Advertisment Depot</p>
                    </div>

                    <ul className="nav_links">
                        <li>
                            <Dropdown
                                titleHepler="Categories"
                                toggleItem={this.toggleSelected}
                                title="Select Category"
                                list={this.state.location}
                            />
                        </li>

                        <li>
                            <button className="btn" href="/">
                                Add new
                            </button>
                        </li>
                        <li>
                            <InputSearch />
                        </li>
                        <li className="user">
                            <FontAwesome name="user" size="5px" />
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Toolbar;
