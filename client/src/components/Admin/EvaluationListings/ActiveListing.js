import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../../react-auth0-spa';
import {
    GetActiveEvaluations,
    GetAllEvaluations,
    GetUserByID,
    GetAllUsers,
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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function EmployeeList2(props) {
    return (
        <ul style={{ width: '100%', listStyleType: 'none' }}>
            {props.users.map((user) => {
                return (
                    <li>
                        <EmployeeBar user={user} />
                    </li>
                );
            })}
        </ul>
    );
}
function EmployeeList(props) {
    return (
        <ul style={{ width: '100%', listStyleType: 'none' }}>
            {props.evaluations &&
                props.evaluations.map((evaluation, index) => {
                    if (evaluation.active) {
                        const creator = evaluation.creator;
                        const user = props.users.find(
                            (user) => user._id === evaluation.e_id
                        );
                        return (
                            <li>
                                <EmployeeBar user={user} />
                            </li>
                        );
                    }
                })}
        </ul>
    );
}

function EmployeeBar(props) {
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
                    <Grid item xs={6}>
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
                            {props.user.role}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <div
                            style={{
                                float: 'right',
                                margin: '15px',
                                paddingRight: '20px',
                                paddingTop: '6px',
                            }}
                        >
                            <IconButton
                                aria-label="add"
                                style={{
                                    backgroundColor: '#4392FE',
                                    color: 'white',
                                }}
                            >
                                <AddIcon />
                            </IconButton>
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

    if (users.length === 0) {
        return <div>Loading</div>;
    }
    return (
        <div>
            <EmployeeList evaluations={activeEvaluations} users={users} />
        </div>
    );
};

export default ActiveListing;
