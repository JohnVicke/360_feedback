import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreateTemplate.css';
import {
    Grow,
    TextField,
    Button,
    Box,
    Tabs,
    Tab,
    Typography,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContentText,
    DialogContent,
} from '@material-ui/core';
import { putTemplate } from '../../utils/API';
import {
    Assignment,
    FilterOutlined,
    Filter1Outlined,
    Filter2Outlined,
    Filter3Outlined,
    Filter4Outlined,
    Filter5Outlined,
    Filter6Outlined,
    Filter7Outlined,
    Filter8Outlined,
    Filter9Outlined,
    QuestionAnswerOutlined,
} from '@material-ui/icons';
import Submitted from '../FillEvaluation/Submit/Submitted';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const CreateTemplate = (props) => {
    const history = useHistory();
    const [template, setTemplate] = useState({ name: '', description: '' });
    const [sections, setSections] = useState([]);
    const [createSections, setCreateSections] = useState(false);
    const [currentSectionName, setCurrentSectionname] = useState('');
    const [createQuestion, setCreateQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({
        content: '',
        description: '',
    });

    const [tabValue, setTabValue] = useState(0);
    const [finishedTemplate, setFinishedTemplate] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleContinue = async () => {
        setFinishedTemplate(true);
        const date = new Date();
        // Set creator to props.creator
        const entry = {
            sections: sections,
            created: date,
            last_used: date,
            name: template.name,
            description: template.description,
            creator: '5e8c66fc1c9d4400007665da',
        };
        await putTemplate(entry);
        setOpenDialog(false);
    };

    const addSection = () => {
        setSections([...sections, { name: currentSectionName, questions: [] }]);
        setCreateQuestion(true);
        setCreateSections(false);
    };

    const newSection = () => {
        setCreateSections(true);
        setCreateQuestion(false);
        setCurrentSectionname('');
    };

    const handleTabChange = (e, newVal) => {
        setTabValue(newVal);
    };

    const newQuestion = () => {
        const _sections = sections;
        const s = _sections.find((s) => s.name === currentSectionName);
        s.questions.push(currentQuestion);
        setSections(_sections);
        setCurrentQuestion({ content: '', description: '' });
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

    const getFilterIcon = (i) => {
        i++;
        switch (i) {
            case 1:
                return <Filter1Outlined />;
            case 2:
                return <Filter2Outlined />;
            case 3:
                return <Filter3Outlined />;
            case 4:
                return <Filter4Outlined />;
            case 5:
                return <Filter5Outlined />;
            case 6:
                return <Filter6Outlined />;
            case 7:
                return <Filter7Outlined />;
            case 8:
                return <Filter8Outlined />;
            case 9:
                return <Filter9Outlined />;
        }
    };

    const sectionTabs = () => {
        return (
            <div>
                <Tabs
                    style={{ width: '400px' }}
                    value={tabValue}
                    onChange={handleTabChange}
                    variant='scrollable'
                    TabIndicatorProps={{ style: { background: '#4392fe' } }}
                >
                    {sections.map((s, i) => (
                        <Tab label={s.name} icon={getFilterIcon(i)} />
                    ))}
                </Tabs>
                {sections.map((s, i) => (
                    <TabPanel value={tabValue} index={i}>
                        {s.questions.map((q) => (
                            <Box
                                display='flex'
                                flexDirection='row'
                                alignItems='center'
                            >
                                <QuestionAnswerOutlined
                                    style={{ marginRight: '1rem' }}
                                />
                                {q.content.length > 39
                                    ? `${q.content.slice(0, 40)}...`
                                    : q.content}
                            </Box>
                        ))}
                    </TabPanel>
                ))}
            </div>
        );
    };

    const finishedComponent = () => {
        return (
            <div className='submit'>
                <Submitted
                    style={{ marginTop: '2rem' }}
                    header={`${template.name} was created!`}
                    subHeader={`It containts ${sections.length} section(s)`}
                    button={{
                        name: 'Continue',
                        func: () => history.push('/'),
                    }}
                />
            </div>
        );
    };

    const getPreviewContent = () => {
        if (template.name === '') {
            return (
                <div className='headerText'>
                    <p>This is a preview window </p>
                </div>
            );
        }

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
                        <p>{template.name}</p>
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
                        <Box
                            style={{ margin: '2rem' }}
                            display='flex'
                            flexDirection='row'
                            alignItems='top'
                            justifyContent='center'
                        >
                            <QuestionAnswerOutlined
                                style={{
                                    height: 200,
                                    width: 200,
                                    marginRight: '2rem',
                                }}
                            />
                            <h1 style={{ fontSize: '2.5rem' }}>
                                Create a new <br /> Question!
                            </h1>
                        </Box>
                    </div>

                    <form className='templateForm'>
                        <p>{`Add new question to ${currentSectionName}`}</p>
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
                            label='Qustion name'
                            variant='outlined'
                            value={currentQuestion.content}
                            onChange={(e) =>
                                setCurrentQuestion({
                                    content: e.target.value,
                                    description: currentQuestion.description,
                                })
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
                                    content: currentQuestion.content,
                                    description: e.target.value,
                                })
                            }
                        />

                        <div>
                            <Button
                                style={{ color: '#fff' }}
                                onClick={() => newQuestion()}
                            >
                                Add Question
                            </Button>
                            <Button
                                style={{ color: '#fff', margin: '0 2rem' }}
                                onClick={() => newSection()}
                            >
                                New Section
                            </Button>
                            <Button
                                style={{ color: '#fff' }}
                                onClick={handleClickOpen}
                            >
                                Finish Template
                            </Button>
                        </div>
                        <Dialog open={openDialog} onClose={handleClose}>
                            <DialogTitle>Save {template.name} ? </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Continue to save your new
                                    evaluation-template!
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                <Button onClick={handleContinue}>
                                    Continue
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                </div>
            );
            // Renders createSections on left side of template
        } else if (createSections) {
            return (
                <div>
                    <div className='headerText'>
                        <Box
                            style={{ margin: '2rem' }}
                            display='flex'
                            flexDirection='row'
                            alignItems='top'
                            justifyContent='center'
                        >
                            <FilterOutlined
                                style={{
                                    height: 200,
                                    width: 200,
                                    marginRight: '2rem',
                                }}
                            />
                            <h1 style={{ fontSize: '2.5 rem' }}>
                                Add a new <br /> section !
                            </h1>
                        </Box>
                    </div>
                    <form className='templateForm'>
                        <p>{`Add Section #${sections.length + 1} to ${
                            template.name
                        }`}</p>
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
                        <Box
                            style={{ margin: '2rem' }}
                            display='flex'
                            flexDirection='row'
                            alignItems='top'
                            justifyContent='center'
                        >
                            <Assignment
                                style={{
                                    height: 200,
                                    width: 200,
                                    marginRight: '2rem',
                                }}
                            />
                            <h1 style={{ fontSize: '2.5rem' }}>
                                Create a new <br /> Template!
                            </h1>
                        </Box>
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
                            value={template.name}
                            onChange={(e) =>
                                setTemplate({
                                    name: e.target.value,
                                    description: template.description,
                                })
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
                            label='Template Description'
                            variant='outlined'
                            value={template.description}
                            onChange={(e) =>
                                setTemplate({
                                    name: template.name,
                                    description: e.target.value,
                                })
                            }
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
    // GetPreviewContent --> displays content on half its parent element??
    return (
        <div className='background'>
            <NavBar />
            {finishedTemplate ? (
                finishedComponent()
            ) : (
                <Grow in={true}>
                    <div className='preview-container'>
                        <div className='createCard'>{getContent()}</div>
                        <div className='preview-window'>
                            {getPreviewContent()}
                        </div>
                    </div>
                </Grow>
            )}
        </div>
    );
};

export default CreateTemplate;
