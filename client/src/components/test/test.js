import React, { Component } from 'react';
import './test.css';

class Test extends Component {
    constructor() {
        super();
        this.state = {
            test_arr: []
        };
    }

    componentDidMount() {
        fetch('/api/test')
            .then(res => res.json())
            .then(test_arr =>
                this.setState({ test_arr }, () =>
                    console.log('Test data fetched', test_arr)
                )
            );
    }

    render() {
        return (
            <div>
                <h2>Group Memebers fetched from api</h2>
                <ul>
                    {this.state.test_arr.map(member => (
                        <li key={member.id}>
                            {member.firstName} {member.lastName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Test;
