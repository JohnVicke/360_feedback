import React, { useState } from 'react';
import './Scale.css';

const Scale = (props) => {
    const [selected, setSelected] = useState(0);
    if (props.answer !== '') {
        if (props.answer !== selected) {
            setSelected(props.answer);
        }
    }
    const selectedStyle = (num) => {
        return selected === num
            ? { backgroundColor: '#4392fe' }
            : { backgroundColor: 'transparent' };
    };

    const getSelectedClassName = (num) => {
        return selected === num ? 'button-group-selected' : 'button-group';
    };

    return (
        <div className="wrapper">
            <div className="button-list">
                <div
                    onClick={() => {
                        setSelected(1);
                        props.handler(1);
                    }}
                    className={getSelectedClassName(1)}
                >
                    <button style={selectedStyle(1)}>1</button>
                    <p>Strongly disagree</p>
                </div>
                <span className="divider"></span>
                <div
                    onClick={() => {
                        setSelected(2);
                        props.handler(2);
                    }}
                    className={getSelectedClassName(2)}
                >
                    <button style={selectedStyle(2)}>2</button>
                    <p>Disagree</p>
                </div>
                <span className="divider"></span>
                <div
                    onClick={() => {
                        setSelected(3);
                        props.handler(3);
                    }}
                    className={getSelectedClassName(3)}
                >
                    <button style={selectedStyle(3)}>3</button>
                    <p>Neutral</p>
                </div>
                <span className="divider"></span>
                <div
                    onClick={() => {
                        setSelected(4);
                        props.handler(4);
                    }}
                    className={getSelectedClassName(4)}
                >
                    <button style={selectedStyle(4)}>4</button>
                    <p>Agree</p>
                </div>
                <span className="divider"></span>
                <div
                    onClick={() => {
                        setSelected(5);
                        props.handler(5);
                    }}
                    className={getSelectedClassName(5)}
                >
                    <button style={selectedStyle(5)}>5</button>
                    <p>Strongly agree</p>
                </div>
            </div>
        </div>
    );
};

export default Scale;
