import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import { Add, Check } from '@material-ui/icons';
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
        margin: '2rem 0',
        transition: 'ease-in-out 0.2s',
        marginRight: '1rem',
    });
    const CompleteSection = styled(Button)({
        background: '#4392FE',
        border: 0,
        color: '#fff',
        height: 40,
        width: 200,
        margin: '2rem 0',
        transition: 'ease-in-out 0.2s',
        marginLeft: '1rem',
    });
    const AddSection = styled(Button)({
        background: '#fff',
        border: 0,
        color: '#222222',
        height: 40,
        width: 200,
        transition: 'ease-in-out 0.2s',
        marginTop: '6rem',
        marginBottom: '2rem',
    });

    const {
        title,
        questionUpdates,
        sectionQuestions,
        handleNewSection,
    } = props;
    // TODO: QUESTIONS MÅSTE FÖR FAN MAPPAS OCH SKICKAS TILLBAKA PÅ NÅGOT VIS
    return (
        <div>
            <h1>{title}</h1>
            <hr style={{ width: '900px', border: '1px solid #F6F6F6' }} />
            {sectionQuestions.map((q) => (
                <Question
                    handleDescriptionUpdate={(newDescription) =>
                        (q.description = newDescription)
                    }
                    handleTitleUpdate={(newTitle) => (q.title = newTitle)}
                    title={q.title}
                    description={q.description}
                />
            ))}
            <Box display='flex' flexDirection='row' justifyContent='center'>
                <AddQuestion
                    onClick={() => {
                        setQuestions([
                            ...questions,
                            {
                                title: '',
                                description: '',
                            },
                        ]);
                        questionUpdates(questions);
                    }}
                >
                    <Add style={{ marginRight: '1rem' }} />
                    Add Question
                </AddQuestion>
            </Box>
        </div>
    );
};

export default CreateSection;
