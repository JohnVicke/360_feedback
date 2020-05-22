import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../../react-auth0-spa';
import Loading from '../../Loading/Loading';
import {
    GetAllEvaluations,
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
        margin: '15px auto',
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
        fontSize: '40',
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

    NumberOfSurveysText: {
        color: '#000000',
        fontSize: '40',
        '& .MuiTypography-body1': {
            textAlign: 'center',
        },
        fontFamily: 'Roboto Mono',
        fontWeight: 'Bold',
        whiteSpace: 'nowrap',
    },

    LastEvaluatedText: {
        color: '#000000',
        fontSize: '40',
        '& .MuiTypography-body1': {
            textAlign: 'center',
        },
        fontFamily: 'Roboto Mono',
        fontWeight: 'Bold',
        whiteSpace: 'nowrap',
    },

    ArchiveButton: {
        color: 'white',
        fontSize: '13px',
    },

    OverviewBoardText: {
        color: '#4392FE',
        fontSize: '16',
    },

    TextMuted: {
        color: '#000000',
        fontSize: '14',
        opacity: '0.7',
        fontFamily: 'Source Sans Pro',
    },

    ProgressCircleRoot: {
        position: 'relative',
    },

    ProgressCircleBackground: {
        color: '#E8E8E8',
    },

    ProgressCircle: {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
    },

    ProgressText: {
        color: '#000000',
        fontSize: '32',
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
            {props.users &&
                props.users.map((user, index) => {
                    return (
                        <ListItem m={'0 auto'} dense disableGutters>
                            <EmployeeBar
                                user={user}
                                evaluations={props.evaluations}
                            />
                        </ListItem>
                    );
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
        let progressColor = '#4392FE';
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

    function EvaluationProgress(props) {
        return (
            <div className={classes.ProgressCircleRoot}>
                <CircularProgress
                    variant="determinate"
                    value={100}
                    className={classes.ProgressCircleBackground}
                    size={'3rem'}
                />
                <CircularProgress
                    className={classes.ProgressCircle}
                    variant="static"
                    size={'3rem'}
                    style={{ color: getProgressColor(props.evaluation) }}
                    value={getProgressValue(props.evaluation)}
                />
            </div>
        );
    }

    function getLastEvaluatedDate(props) {
        console.log('propsingetlast:');
        console.log(props);
        var lastEvaluation = props.evaluations.find(
            (survey) => survey.e_id === props.user._id
        );

        if (!lastEvaluation) {
            return '-';
        } else {
            return getDate(lastEvaluation);
        }
    }

    return (
        <Box className={classes.EmployeeBar} bgcolor="#F6F6F6">
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid className={classes.EmployeeBarGridItem} item xs>
                    <Grid
                        container
                        alignItems="center"
                        justify="flex-start"
                        direction="row"
                    >
                        <Hidden mdDown>
                            <Grid
                                item
                                xs={6}
                                justify="flex-start"
                                alignItems="center"
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
                            direction="column"
                            alignItems="center"
                            textAlign={'left'}
                        >
                            <Typography
                                className={classes.UserNameText}
                                align="left"
                            >
                                {username}
                            </Typography>
                            <Typography
                                className={classes.UserRoleText}
                                align="left"
                            >
                                {props.user.role}
                            </Typography>
                            <Typography
                                className={classes.UserRoleText}
                                align="left"
                            >
                                {props.user.email}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid />
                </Grid>
                <Divider orientation="vertical" flexItem light />
                <Grid className={classes.EmployeeBarGridItem} item xs>
                    <Typography
                        className={classes.NumberOfSurveysText}
                        align="center"
                    >
                        Number of surveys: {props.user.responses.length}
                    </Typography>
                    <Typography
                        className={classes.LastEvaluatedText}
                        align="center"
                    >
                        Last evaluated: {getLastEvaluatedDate(props)}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

const ActiveListing = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
    const [activeEvaluations, setActiveEvaluations] = useState([]);
    const [templates, setTemplates] = useState([]);

    const [users, setUsers] = useState([]);

    const { loggedInUser } = useAuth0();

    useEffect(() => {
        const fetchEvaluations = async () => {
            const response = await GetAllEvaluations();
            response.data.data.sort(
                (a, b) =>
                    new Date(b.created_date).getTime() -
                    new Date(a.created_date).getTime()
            );
            setActiveEvaluations(response.data.data);
        };
        fetchEvaluations();
    }, [loggedInUser]);

    const fetchActiveEvaluations = async () => {
        const response = await GetAllEvaluations();
        setActiveEvaluations(response.data.data);
    };

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
        setActiveEvaluations(response.data.data);
    }

    if (users.length === 0) {
        return <Loading />;
    }

    return (
        <div>
            <EmployeeList
                evaluations={activeEvaluations}
                users={users}
                templates={templates}
                updateFunction={updateSurvey}
            />
        </div>
    );
};

export default ActiveListing;
