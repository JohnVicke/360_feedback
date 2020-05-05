import React, { useState } from 'react';
import './Scale.css';

const Scale = (props) => {
    const [selected, setSelected] = useState(0);

    const selectedStyle = (num) => {
        return selected === num
            ? { backgroundColor: '#4392fe' }
            : { backgroundColor: 'transparent' };
    };

    const getSelectedClassName = (num) => {
        return selected === num ? 'button-group-selected' : 'button-group';
    };

    return (
        <div className='wrapper'>
            <div className='button-list'>
                <div
                    onClick={() => setSelected(1)}
                    className={getSelectedClassName(1)}
                >
                    <button style={selectedStyle(1)}>1</button>
                    <p>Horrible</p>
                </div>
                <span className='divider'></span>
                <div
                    onClick={() => setSelected(2)}
                    className={getSelectedClassName(2)}
                >
                    <button style={selectedStyle(2)}>2</button>
                    <p>Bad</p>
                </div>
                <span className='divider'></span>
                <div
                    onClick={() => setSelected(3)}
                    className={getSelectedClassName(3)}
                >
                    <button style={selectedStyle(3)}>3</button>
                    <p>Mediocre</p>
                </div>
                <span className='divider'></span>
                <div
                    onClick={() => setSelected(4)}
                    className={getSelectedClassName(4)}
                >
                    <button style={selectedStyle(4)}>4</button>
                    <p>Good</p>
                </div>
                <span className='divider'></span>
                <div
                    onClick={() => setSelected(5)}
                    className={getSelectedClassName(5)}
                >
                    <button style={selectedStyle(5)}>5</button>
                    <p>Great</p>
                </div>
            </div>
            <h1>{selected}</h1>
        </div>
    );
};

export default Scale;
