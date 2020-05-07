import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import './Question.css';

const Question = (props) => {
    const [likertSelected, setLikertSelected] = useState(true);

    const likertClassName = () => {
        return likertSelected ? 'selection selected' : 'selection';
    };

    const freeTextClassName = () => {
        return likertSelected ? 'selection' : 'selection selected';
    };
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyItems='center'
            alignItems='center'
            className='q'
        >
            <input className='q-title' type='text' placeholder={props.title} />
            <textarea
                className='q-description'
                placeholder={props.description}
            />
            <div>
                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    className='switch'
                    style={{ marginTop: '2rem' }}
                >
                    <div
                        className={likertClassName()}
                        onClick={() => setLikertSelected(false)}
                    >
                        <p>Likert</p>
                    </div>
                    <div
                        className={freeTextClassName()}
                        onClick={() => setLikertSelected(true)}
                    >
                        <p>Free Text</p>
                    </div>
                </Box>
            </div>
        </Box>
    );
};

export default Question;
