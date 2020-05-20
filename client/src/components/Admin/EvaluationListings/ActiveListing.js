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
        width: "90%",
        maxHeight: '50vh',
        margin: "auto",
        listStyleType: 'none',
        overflow: 'auto',
    },

    EmployeeBar: {
        borderRadius: '15px',
        margin: "15px auto",
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: '#F6F6F6',
        width: "95%",
        maxHeight: "20%",
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
        margin: '2rem'
    },

    UserNameText: {
        fontFamily: 'Source Sans Pro',
        fontWeight: 'bold',
        display: "flex",
        whiteSpace: "nowrap",
    },

    UserRoleText: {
        color: "#131313",
        opacity: '0.7',
        fontFamily: 'Source Sans Pro',
    },

    ArchiveButton: {
        color: 'white',
        fontSize: '13px',
    },

    OverviewBoardButton: {
        color: 'white',
        fontSize: '13px',
    },

    TextMuted: {
        opacity: '0.7',
        fontFamily: 'Source Sans Pro',
    },

    ProgressCircle: {},


    ProgressText: {
        color: "#000000",
        fontSize: '1rem',
    },

}));

function EmployeeList(props) {
    const classes = useStyles();
    return (
        <List className={classes.EmployeeList} m={"0 0"} alignItems={"center"}>
            {props.evaluations &&
                props.evaluations.map((evaluation, index) => {
                    if (evaluation.active) {
                        const creator = evaluation.creator;
                        const user = props.users.find(
                            (user) => user._id === evaluation.e_id
                        );
                        return (
                            <ListItem>
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
    const username = props.user.given_name + " " + props.user.family_name;

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
        let progressColor = "#4392FE";
        const responses = evaluation.responses;
        var nrOfAnswers = 0;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].answers.length > 0) {
                nrOfAnswers++;
            }
        }
        var percentage = (nrOfAnswers / responses.length) * 100;
        if (percentage === 100) {
            progressColor = "#5ABE41";
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

    function getTemplateName(templateId) {
        console.log(templateId);
        console.log(props.templates);

        const template = props.templates.find(
            (template) => template._id === templateId
        );
        return template.name;
    }

    return (
        <Box className={classes.EmployeeBar}
            bgcolor="#F6F6F6">
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid className={classes.EmployeeBarGridItem} item xs
                >
                    <Grid container
                        alignItems="center"
                        justify="flex-start"
                        direction="row"
                    >
                        <Hidden mdDown>
                            <Grid item xs={6}
                                justify="flex-start"
                                alignItems="center"

                            >
                                <Avatar className={classes.Avatar}
                                    src={props.user.picture}
                                />
                            </Grid>
                        </Hidden>
                        <Grid item xs={6} textAlign="center"
                            direction="column"
                            alignItems="center"
                        >
                            <Typography
                                className={classes.UserNameText}
                                variant="h6"
                                color="#000000"
                                align="left"
                            >
                                {username}
                            </Typography>
                            <Typography
                                variant="h7"
                                classname={classes.UserRoleText}
                            >
                                {props.user.role}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid />
                </Grid>
                <Grid className={classes.EmployeeBarGridItem} direction={'column'} item xs
                    alignContent={"center"}>
                    <Typography
                        variant="h7"
                        classname={classes.TextMuted}
                        color="#131313"
                    >
                        {getTemplateName(props.evaluation.template_id)}
                    </Typography>

                    <Box flexDirection="row">
                        <CircularProgress
                            className={classes.ProgressCircle}
                            variant="static"
                            size={"3rem"}
                            style={{ color: getProgressColor(props.evaluation) }}
                            value={getProgressValue(props.evaluation)}
                        />
                        <Typography className={classes.ProgressText}
                        >
                            {getProgressString(props.evaluation)}
                        </Typography>
                    </Box>

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
                <Divider orientation="vertical" flexItem light />
                <Grid className={classes.EmployeeBarGridItem} item xs>
                    <Typography
                        my={"2rem"}
                        style={{ opacity: '0.5', fontSize: '10px', color: "#000000" }}
                    >
                        CURRENTLY ACTIVE
                    </Typography>
                    <Button className={classes.ArchiveButton}
                        aria-label="add"

                        style={{ backgroundColor: getProgressColor(props.evaluation) }}
                        onClick={() => {
                            props.updateFunction(
                                props.evaluation._id,
                                false
                            );
                        }}
                    >
                        ARCHIVE
                    </Button>
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
            console.log(response.data);
            setUsers(response.data);
        };
        fetchUsers();
    }, [loggedInUser]);

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await (await GetAllTemplates()).data;
            console.log('TEMPLATES');
            console.log(response);
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
    } else if (activeEvaluations.length === 0 || templates.length === 0) {
        return <div>No active evaluations found</div>;
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
