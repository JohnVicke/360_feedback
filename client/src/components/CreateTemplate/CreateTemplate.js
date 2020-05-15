import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreateTemplate.css';
import {
    TextField,
    Button,
    Box,
    Tabs,
    Tab,
    Typography,
} from '@material-ui/core';
import { Assignment, SentimentVerySatisfiedOutlined } from '@material-ui/icons';
const CreateTemplate = (props) => {
    const [templateName, setTemplateName] = useState('');
    const [sections, setSections] = useState([]);
    const [createSections, setCreateSections] = useState(false);
    const [currentSectionName, setCurrentSectionname] = useState('');
    const [createQuestion, setCreateQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({
        name: '',
        description: '',
    });
    const [tabValue, setTabValue] = useState(0);
    const addSection = () => {
        setSections([...sections, { name: currentSectionName, questions: [] }]);
        setCreateQuestion(true);
        setCreateSections(false);
    };

    const handleTabChange = (e, newVal) => {
        setTabValue(newVal);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role='tabpanel'
                hidden={tabValue !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                {tabValue === index && (
                    <Box p={2}>
                        <Typography
                            style={{
                                fontFamily: 'Source Sans Pro',
                                fontWeight: 400,
                            }}
                        >
                            {children}
                        </Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    const sectionTabs = () => {
        return (
            <div>
                <Tabs
                    style={{ width: '400px' }}
                    value={tabValue}
                    onChange={handleTabChange}
                    variant='scrollable'
                >
                    {sections.map((s) => (
                        <Tab label={s.name} />
                    ))}
                </Tabs>
                {sections.map((s, i) => (
                    <TabPanel value={tabValue} index={i}>
                        {s.questions.map((q) => (
                            <div>
                                {q.name.length > 39
                                    ? `${q.name.slice(0, 40)}...`
                                    : q.name}
                            </div>
                        ))}
                    </TabPanel>
                ))}
            </div>
        );
    };

    const getPreviewContent = () => {
        if (templateName === '') {
            return (
                <div className='headerText'>
                    <p>This is a preview window </p>
                </div>
            );
        }
        // TODO : Customize MATERIAL UI TABS for SECTIONS mapped :)
        return (
            <div>
                <div className='headerText'>
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Assignment style={{ marginRight: '0.2rem' }} />
                        <p>{templateName}</p>
                    </Box>
                    {sections.length > 0 && sectionTabs()}
                </div>
            </div>
        );
    };

    // TODO: Refactor this pile of shit code into components
    const getContent = () => {
        // Renders CreateQuestions section on left side of template

        if (createQuestion) {
            return (
                <div>
                    <div className='headerText'>
                        <h1>{templateName}</h1>
                        <h2>{currentSectionName}</h2>
                    </div>

                    <form className='templateForm'>
                        <p>Add new question!</p>
                        <TextField
                            InputProps={{
                                style: {
                                    Color: 'white',
                                    fontFamily: 'Source Sans Pro',
                                    borderColor: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#fff',
                                    opacity: '0.5',
                                },
                            }}
                            label='Qustion name'
                            variant='outlined'
                            value={currentQuestion.name}
                            onChange={(e) =>
                                setCurrentQuestion({ name: e.target.value })
                            }
                        />

                        <TextField
                            style={{ marginTop: '2rem' }}
                            InputProps={{
                                style: {
                                    color: 'white',
                                    fontFamily: 'Source Sans Pro',
                                    borderColor: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#fff',
                                    opacity: '0.5',
                                },
                            }}
                            label='Question description'
                            variant='outlined'
                            value={currentQuestion.description}
                            onChange={(e) =>
                                setCurrentQuestion({
                                    description: e.target.value,
                                })
                            }
                        />

                        <div>
                            <Button
                                style={{ color: '#fff' }}
                                onClick={() => setCreateQuestion(true)}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </div>
            );
            // Renders createSections on left side of template
        } else if (createSections) {
            return (
                <div>
                    <div className='headerText'>
                        <h1>{templateName}</h1>
                    </div>
                    <form className='templateForm'>
                        <p>Add your first section</p>
                        <TextField
                            InputProps={{
                                style: {
                                    color: 'white',
                                    fontFamily: 'Source Sans Pro',
                                    borderColor: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#fff',
                                    opacity: '0.5',
                                },
                            }}
                            label='Section Name'
                            variant='outlined'
                            value={currentSectionName}
                            onChange={(e) =>
                                setCurrentSectionname(e.target.value)
                            }
                        />
                        <div>
                            <Button
                                style={{ color: '#fff' }}
                                onClick={() => addSection()}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </div>
            );
            // Loads template name
        } else {
            return (
                <div>
                    <div className='headerText'>
                        <h1>Create a new template!</h1>
                        <Assignment style={{ height: 200, width: 200 }} />
                    </div>
                    <form className='templateForm'>
                        <p>Start by asigning it a name</p>
                        <TextField
                            InputProps={{
                                style: {
                                    color: 'white',
                                    fontFamily: 'Source Sans Pro',
                                    borderColor: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#fff',
                                    opacity: '0.5',
                                },
                            }}
                            label='Template Name'
                            variant='outlined'
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                        />
                        <div>
                            <Button
                                style={{ color: '#fff' }}
                                onClick={() => setCreateSections(true)}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </div>
            );
        }
    };
    return (
        <div className='background'>
            <div className='preview-container'>
                <div className='createCard'>{getContent()}</div>
                <div className='preview-window'>{getPreviewContent()}</div>
            </div>
        </div>
    );
};

export default CreateTemplate;
