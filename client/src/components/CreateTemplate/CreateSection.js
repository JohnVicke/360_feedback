import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Question from './Question';

const CreateSection = (props) => {
    const [questions, setQuestions] = useState([
        {
            title: 'Question title',
            description: 'Question description(optional)',
        },
    ]);

    const AddQuestion = styled(Button)({
        background: '#4392FE',
        border: 0,
        color: '#fff',
        height: 40,
        width: 200,
        marginTop: '2rem',
        transition: 'ease-in-out 0.2s',
    });

    const { title } = props;
    return (
        <div>
            <h1>{title}</h1>
            <hr style={{ width: '900px', border: '1px solid #F6F6F6' }} />
            {questions.map((q) => (
                <Question title={q.title} description={q.description} />
            ))}
            <AddQuestion>
                <Add style={{ marginRight: '1rem' }} />
                Add Question
            </AddQuestion>
        </div>
    );
};

export default CreateSection;
