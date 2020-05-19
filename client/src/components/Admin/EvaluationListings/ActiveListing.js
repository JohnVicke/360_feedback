import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useAuth0} from '../../../react-auth0-spa';
import Loading from '../../Loading/Loading';
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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

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
    },

    ArchiveButton: {
        backgroundColor: '#4392FE',
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
    let progressColor = '#4392FE'; //Unless complete

    function getProgressValue(evaluation) {
        const responses = evaluation.responses;
        var nrOfAnswers = 0;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].answers.length > 0) {
                nrOfAnswers++;
            }
        }
        var percentage = (nrOfAnswers / responses.length) * 100;
        if(percentage === 100){
            progressColor = "#5ABE41";
        }
        return percentage;
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
                          justify="center"
                          direction="row"
                    >
                        <Hidden mdDown>
                            <Grid item xs={6}
                                  justify="flex-start"
                            >
                                <Avatar className={classes.Avatar}
                                        src={props.user.picture}
                                />
                            </Grid>
                        </Hidden>
                        <Grid item xs={6}
                              direction="column"
                              alignItems="center"
                              textAlign={"left"}>
                            <Typography
                                variant="h5"
                                style={{
                                    fontFamily: 'Source Sans Pro',
                                    fontWeight: 'bold',
                                }}
                                color="#000000"
                            >
                                {username}
                            </Typography>
                            <Typography
                                variant="h6"
                                align={"left"}
                                classname={classes.TextMuted}
                                color="#131313"
                            >
                                {props.user.role}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid/>
                </Grid>
                <Grid className={classes.EmployeeBarGridItem} item xs>
                    <Typography
                        variant="h6"
                        classname={classes.TextMuted}
                        color="#131313"
                    >
                        {getTemplateName(props.evaluation.template_id)}
                    </Typography>

                    <CircularProgress
                        className={classes.ProgressCircle}
                        variant="static"
                        size={"3rem"}
                        color={{progressColor}}
                        value={getProgressValue(props.evaluation)}
                    />
                    <Typography className={classes.ProgressText}
                    >
                        {getProgressString(props.evaluation)}
                    </Typography>

                    <Link
                        to={{
                            pathname: '/admin/overviewboard',
                            state: {
                                surveyId: props.evaluation._id,
                            },
                        }}
                    >
                        Overview Board
                    </Link>
                </Grid>
                <Grid className={classes.EmployeeBarGridItem} item xs>
                    <Typography
                        style={{opacity: '0.5', fontSize: '10px', color: "#000000"}}
                    >
                        CURRENTLY ACTIVE
                    </Typography>
                    <Button className={classes.ArchiveButton}
                            aria-label="add"
                            style={{backgroundColor: {progressColor}}}
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

    const {loggedInUser} = useAuth0();

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
        const res = await UpdateSurveyActive(id, {active: active});
        const response = await GetAllEvaluations();
        setActiveEvaluations(response.data.data);
    }

    if (users.length === 0) {
        return <Loading/>;
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
