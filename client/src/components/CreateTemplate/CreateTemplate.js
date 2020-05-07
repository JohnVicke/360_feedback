import React, { useState } from 'react';
import './CreateTemplate.css';
import {
    Button,
    makeStyles,
    Box,
    Card,
    Typography,
    TextField,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Edit, Add } from '@material-ui/icons';
import CreateSection from './CreateSection';
import { useEffect } from 'react';

class CreateTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateName: 'Template Name',
            changeTemplateName: false,
            sections: [
                {
                    title: 'Section 1: Section Name',
                },
            ],
        };
    }

    render() {
        const StyledCard = styled(Card)({
            background: '#222222',
            border: 0,
            borderRadius: 15,
            color: 'white',
            width: 1200,
            height: 850,
            textAlign: 'center',
            margin: '2rem auto',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: '4px',
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'darkgrey',
                outline: '1px solid slategrey',
            },
        });

        const AddSection = styled(Button)({
            background: '#fff',
            border: 0,
            color: '#222222',
            height: 40,
            width: 200,
            transition: 'ease-in-out 0.2s',
            marginTop: '6rem',
        });

        const newSection = () => {
            const { sections } = this.state;
            sections.push({
                title: `Section ${
                    this.state.sections.length + 1
                }: Section Name`,
            });
            this.setState({ sections: sections });
        };

        const handleTemplateNameChange = (e) => {
            this.setState({ templateName: e.target.value });
        };

        const editableTemplateName = () => {
            if (this.state.changeTemplateName) {
                return (
                    <TextField
                        InputProps={{
                            style: {
                                color: 'white',
                                fontFamily: 'Source Sans Pro',
                                fontSize: '30px',
                                borderColor: 'white',
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: '#fff',
                                fontFamily: 'Source Sans Pro',
                                opacity: '0.5',
                            },
                        }}
                        value={this.state.templateName}
                        autoFocus
                        onChange={handleTemplateNameChange}
                        onBlur={() => {
                            this.setState({ changeTemplateName: false });
                        }}
                    />
                );
            } else {
                return (
                    <Box
                        style={{ cursor: 'pointer' }}
                        alignItems='top'
                        justifyContent='center'
                        display='flex'
                        flexDirection='row'
                        onClick={() =>
                            this.setState({ changeTemplateName: true })
                        }
                    >
                        <Typography
                            style={{
                                fontSize: '30px',
                                fontWeight: '700',
                                fontFamily: 'Source Sans Pro',
                                marginRight: '1rem',
                            }}
                        >
                            {this.state.templateName}
                        </Typography>
                        <Edit
                            style={{
                                fontSize: '18px',
                                marginTop: '5px',
                            }}
                        />
                    </Box>
                );
            }
        };

        return (
            <div className='background'>
                <Typography
                    style={{
                        textAlign: 'center',
                        margin: '2rem 0',
                        fontFamily: 'Source Sans Pro',
                        fontSize: '20px',
                        color: '#fff',
                    }}
                >
                    Create template
                </Typography>
                <StyledCard>
                    {editableTemplateName()}
                    {this.state.sections.map((s) => (
                        <CreateSection title={s.title} />
                    ))}
                    <AddSection onClick={newSection}>
                        <Add style={{ marginRight: '1rem' }} />
                        Add Section
                    </AddSection>
                </StyledCard>
            </div>
        );
    }
}
export default CreateTemplate;
