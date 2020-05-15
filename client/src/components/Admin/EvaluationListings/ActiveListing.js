import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../../react-auth0-spa';
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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function EmployeeList(props) {
    return (
        <ul
            style={{
                width: '100%',
                listStyleType: 'none',
                maxHeight: '50vh',
                overflow: 'auto',
            }}
        >
            {props.evaluations &&
                props.evaluations.map((evaluation, index) => {
                    if (evaluation.active) {
                        const creator = evaluation.creator;
                        const user = props.users.find(
                            (user) => user._id === evaluation.e_id
                        );
                        return (
                            <li>
                                <EmployeeBar
                                    user={user}
                                    evaluation={evaluation}
                                    templates={props.templates}
                                    updateFunction={props.updateFunction}
                                />
                            </li>
                        );
                    }
                })}
        </ul>
    );
}

function EmployeeBar(props) {
    function getProgressValue(evaluation) {
        const responses = evaluation.responses;
        var nrOfAnswers = 0;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].answers.length > 0) {
                nrOfAnswers++;
            }
        }
        var percentage = (nrOfAnswers / responses.length) * 100;
        console.log('HÄR HÄR HÄR');
        console.log(percentage);
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
        <Box
            className="employeeBar"
            bgcolor="#F6F6F6"
            width="0.95"
            style={{
                borderRadius: '15px',
                marginTop: '15px',
                paddingTop: '10px',
                paddingBottom: '10px',
            }}
        >
            <div>
                {console.log(props)}
                <Grid container>
                    <Grid style={{ marginTop: '0.7rem' }} item xs>
                        <Avatar
                            src={props.user.picture}
                            style={{
                                float: 'left',
                                margin: '15px',
                                width: '60px',
                                height: '60px',
                            }}
                        />

                        <Typography
                            variant="h5"
                            style={{
                                paddingTop: '10px',
                                fontFamily: 'Source Sans Pro',
                                fontWeight: 'bold',
                            }}
                            color="#000000"
                        >
                            {props.user.given_name +
                                ' ' +
                                props.user.family_name}
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{
                                opacity: '0.7',
                                marginTop: '2px',
                                fontFamily: 'Source Sans Pro',
                                fontWeight: 'bold',
                            }}
                            color="#131313"
                        >
                            {getTemplateName(props.evaluation.template_id)}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    margin: '0 auto',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <CircularProgress
                                    style={{
                                        color: '#4392FE',
                                        marginTop: '0.5rem',
                                        marginLeft: '8rem',
                                    }}
                                    variant="static"
                                    size={60}
                                    value={getProgressValue(props.evaluation)}
                                />
                                <Typography
                                    style={{
                                        margin: 'auto 2rem',
                                        fontSize: '30px',
                                    }}
                                >
                                    {getProgressString(props.evaluation)}
                                </Typography>
                            </div>
                            <Link
                                to={{
                                    pathname: '/admin/overviewboard',
                                    state: {
                                        surveyId: props.evaluation._id,
                                    },
                                }}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    aria-label="add"
                                    style={{
                                        backgroundColor: '#4392FE',
                                        color: 'white',
                                        fontSize: '13px',
                                        margin: '0.5rem auto',
                                        width: '40%',
                                    }}
                                >
                                    Overview Board
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                    <Grid style={{ marginTop: '0.7rem' }} item xs>
                        <div
                            style={{
                                float: 'right',
                                margin: '5px 15px',
                                paddingRight: '20px',
                                paddingTop: '6px',
                                textAlign: 'center',
                            }}
                        >
                            <Typography
                                style={{ opacity: '0.5', fontSize: '10px' }}
                            >
                                CURRENTLY ACTIVE
                            </Typography>
                            <Button
                                aria-label="add"
                                style={{
                                    backgroundColor: '#4392FE',
                                    color: 'white',
                                    fontSize: '13px',
                                    marginTop: '0.5rem',
                                }}
                                onClick={() => {
                                    props.updateFunction(
                                        props.evaluation._id,
                                        false
                                    );
                                }}
                            >
                                ARCHIVE
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
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
        console.log('Klick');
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
