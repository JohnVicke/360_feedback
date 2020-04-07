import React, { Component } from 'react';
import './dropdown.css';
const FontAwesome = require('react-fontawesome');

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOpen: false,
            headerTitle: this.props.title,
        };
    }
    handleClickOutside() {
        this.setState({
            listOpen: false,
        });
    }
    toggleList() {
        this.setState((prevState) => ({
            listOpen: !prevState.listOpen,
        }));
    }

    render() {
        const { list } = this.props;
        const { listOpen, headerTitle } = this.state;
        return (
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{headerTitle}</div>
                    <div className="fontawesome">
                        {listOpen ? (
                            <FontAwesome name="angle-up" size="2x" />
                        ) : (
                            <FontAwesome name="angle-down" size="2x" />
                        )}
                    </div>
                </div>
                {listOpen && (
                    <ul className="dd-list">
                        {list.map((item) => (
                            <li
                                className="dd-list-item"
                                key={item.title}
                                onClick={(e) =>
                                    this.props.toggleItem(item.id, item.key)
                                }
                            >
                                {item.title}{' '}
                                {item.selected && <FontAwesome name="check" />}
                            </li>
                        ))}
                        <li className="button">
                            <button className="btn">GO</button>
                        </li>
                    </ul>
                )}
            </div>
        );
    }
}

export default Dropdown;
