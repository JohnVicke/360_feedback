import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../../react-auth0-spa';
import {
    GetActiveEvaluations,
    GetAllEvaluations,
    GetUserByID,
    GetAllUsers,
    GetAllTemplates,
    UpdateSurveyActive,
} from '../../../utils/API';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListItemAvatar,
    Checkbox,
    Avatar,
    Grid,
    IconButton,
    Button,
    CircularProgress,
    Hidden,
    Divider,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../../Loading/Loading';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },

    EmployeeList: {
        width: '90%',
        maxHeight: '50vh',
        margin: 'auto',
        listStyleType: 'none',
        overflow: 'auto',
    },

    EmployeeBar: {
        borderRadius: '15px',
        margin: '15px 0',
        backgroundColor: '#F6F6F6',
        width: '95%',
        maxHeight: '20%',
    },

    EmployeeBarGridItem: {
        margin: '0 auto',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    Avatar: {
        width: '5rem',
        height: '5rem',
        margin: '2rem',
    },

    UserNameText: {
        color: '#000000',
        fontSize: '30',
        fontFamily: 'Source Sans Pro',
        fontWeight: 'Bold',
        display: 'flex',
        whiteSpace: 'nowrap',
    },

    UserRoleText: {
        fontSize: '22',
        color: '#000000',
        opacity: '0.7',
        fontFamily: 'Source Sans Pro',
        fontWeight: 'Bold',
    },

    ResumeButton: {
        backgroundColor: '#472F80',
        color: 'white',
        fontSize: '13px',
    },

    OverviewBoardText: {
        color: '#4392FE',
        fontSize: '16',
    },

    TextMuted: {
        color: '#000000',
        opacity: '0.7',
        fontFamily: 'Source Sans Pro',
    },

    ProgressCircle: {
        color: '#FBCA53',
    },

    ProgressText: {
        color: '#000000',
        fontSize: '1rem',
        fontFamily: 'Roboto Mono',
    },

    CurrentStatusText: {
        fontSize: '13',
        opacity: '0.5',
        color: '#000000',
    },

    TimeStamp: {
        opacity: '0.5',
        color: '#000000',
        fontSize: '1rem',
        fontFamily: 'Roboto Mono',
    },
}));

function EmployeeList(props) {
    const classes = useStyles();
    return (
        <List className={classes.EmployeeList} m={'0 0'} alignItems={'center'}>
            {props.evaluations &&
                props.evaluations.map((evaluation, index) => {
                    if (!evaluation.active) {
                        const creator = evaluation.creator;
                        const user = props.users.find(
                            (user) => user._id === evaluation.e_id
                        );
                        return (
                            <ListItem m={'0'}>
                                <EmployeeBar
                                    user={user}
                                    evaluation={evaluation}
                                    templates={props.templates}
                                    updateFunction={props.updateFunction}
                                />
                            </ListItem>
                        );
                    }
                })}
        </List>
    );
}

function EmployeeBar(props) {
    const classes = useStyles();
    const username = props.user.given_name + ' ' + props.user.family_name;

    function getProgressValue(evaluation) {
        const responses = evaluation.responses;
        var nrOfAnswers = 0;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].answers.length > 0) {
                nrOfAnswers++;
            }
        }
        var percentage = (nrOfAnswers / responses.length) * 100;
        return percentage;
    }

    function getProgressColor(evaluation) {
        let progressColor = '#FBCA53';
        const responses = evaluation.responses;
        var nrOfAnswers = 0;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].answers.length > 0) {
                nrOfAnswers++;
            }
        }
        var percentage = (nrOfAnswers / responses.length) * 100;
        if (percentage === 100) {
            progressColor = '#5ABE41';
        }
        return progressColor;
    }

    function getProgressString(evaluation) {
        const responses = evaluation.responses;
        var nrOfAnswers = 0;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].answers.length > 0) {
                nrOfAnswers++;
            }
        }
        return nrOfAnswers + ' / ' + responses.length;
    }

    function getDate(evaluation) {
        var date = '-';
        if (!evaluation.created_date) {
        } else {
            var created_date = new Date(evaluation.created_date);
            date =
                created_date.getDate() +
                '/' +
                (created_date.getMonth() + 1) +
                ' - ' +
                created_date.getFullYear();
        }

        return date;
    }

    function getTemplateName(templateId) {
        const template = props.templates.find(
            (template) => template._id === templateId
        );
        return template.name;
    }

    return (
        <Box className={classes.EmployeeBar} bgcolor='#F6F6F6'>
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
            >
                <Grid className={classes.EmployeeBarGridItem} item xs>
                    <Grid
                        container
                        alignItems='center'
                        justify='flex-start'
                        direction='row'
                    >
                        <Hidden mdDown>
                            <Grid
                                item
                                xs={6}
                                justify='flex-start'
                                alignItems='center'
                            >
                                <Avatar
                                    className={classes.Avatar}
                                    src={props.user.picture}
                                />
                            </Grid>
                        </Hidden>
                        <Grid
                            item
                            xs={6}
                            direction='column'
                            alignItems='center'
                            textAlign={'left'}
                        >
                            <Typography
                                className={classes.UserNameText}
                                align='left'
                            >
                                {username}
                            </Typography>
                            <Typography
                                classname={classes.UserRoleText}
                                align='left'
                            >
                                {props.user.role}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid />
                </Grid>
                <Grid
                    className={classes.EmployeeBarGridItem}
                    direction={'column'}
                    item
                    xs
                    alignContent={'center'}
                >
                    <Typography className={classes.TextMuted}>
                        {getTemplateName(props.evaluation.template_id)}
                    </Typography>
                    <CircularProgress
                        className={classes.ProgressCircle}
                        variant='static'
                        size={'3rem'}
                        style={{ color: getProgressColor(props.evaluation) }}
                        value={getProgressValue(props.evaluation)}
                    />
                    <Typography className={classes.ProgressText}>
                        {getProgressString(props.evaluation)}
                    </Typography>

                    <Link
                        to={{
                            pathname: '/admin/overviewboard',
                            state: {
                                surveyId: props.evaluation._id,
                            },
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        Overview Board
                    </Link>
                </Grid>
                <Divider orientation='vertical' flexItem light />
                <Grid className={classes.EmployeeBarGridItem} item xs>
                    <Typography className={classes.TimeStamp}>
                        {getDate(props.evaluation)}
                    </Typography>

                    <Typography
                        className={classes.CurrentStatusText}
                        my={'2rem'}
                    >
                        CURRENTLY ARCHIVED
                    </Typography>
                    <Button
                        className={classes.ResumeButton}
                        aria-label='add'
                        style={{ backgroundColor: '#472F80' }}
                        onClick={() => {
                            props.updateFunction(props.evaluation._id, true);
                        }}
                    >
                        RESUME
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const ArchivedListing = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [archivedEvaluations, setArchivedEvaluations] = useState([]);
    const [templates, setTemplates] = useState([]);

    const { loggedInUser } = useAuth0();

    useEffect(() => {
        const fetchEvaluations = async () => {
            const response = await GetAllEvaluations();
            response.data.data.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
            setArchivedEvaluations(response.data.data);
        };
        fetchEvaluations();
    }, [loggedInUser]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await GetAllUsers();

            setUsers(response.data);
        };
        fetchUsers();
    }, [loggedInUser]);

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await (await GetAllTemplates()).data;

            setTemplates(response.data);
        };
        fetchTemplates();
    }, [loggedInUser]);

    async function updateSurvey(id, active) {
        const res = await UpdateSurveyActive(id, { active: active });
        const response = await GetAllEvaluations();
        setArchivedEvaluations(response.data.data);
    }

    if (users.length === 0) {
        return <Loading />;
    } else if (archivedEvaluations.length === 0 || templates.length === 0) {
        return <div>No archived evaluations found</div>;
    }
    return (
        <div>
            <EmployeeList
                evaluations={archivedEvaluations}
                users={users}
                templates={templates}
                updateFunction={updateSurvey}
            />
        </div>
    );
};

export default ArchivedListing;
