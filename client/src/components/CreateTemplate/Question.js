import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import './Question.css';

const Question = (props) => {
    const [newTitle, setnewTitle] = useState('');
    const [likertSelected, setLikertSelected] = useState(true);
    const [newDescription, setNewDescription] = useState('');
    const likertClassName = () => {
        return likertSelected ? 'selection selected' : 'selection';
    };

    const freeTextClassName = () => {
        return likertSelected ? 'selection' : 'selection selected';
    };

    const handleTitleChange = (e) => {
        setnewTitle(e.target.value);
        props.handleTitleUpdate(newTitle);
    };

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
        props.handleDescriptionUpdate(newDescription);
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyItems='center'
            alignItems='center'
            className='q'
        >
            <input
                className='q-title'
                type='text'
                placeholder='Question title'
                value={newTitle}
                onChange={handleTitleChange}
            />
            <textarea
                value={newDescription}
                onChange={handleDescriptionChange}
                className='q-description'
                placeholder='Question description(optional)'
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
