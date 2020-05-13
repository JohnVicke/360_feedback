import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { useAuth0 } from '../../../react-auth0-spa';
import {GetActiveEvaluations, GetAllEvaluations, GetUserByID, GetAllUsers} from '../../../utils/API';
import {Box, Typography} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ActiveListing = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
    const [activeEvaluations, setActiveEvaluations] = useState([]);
    const [users, setUsers] = useState([]);
    const { loggedInUser } = useAuth0();

    useEffect(()=> {
        const fetchEvaluations = async () => {
            const response = await GetAllEvaluations();
            setActiveEvaluations(response.data.data);
        };
        fetchEvaluations();
    }, [loggedInUser]);


    const fetchActiveEvaluations = async () => {
        const response = await GetAllEvaluations();
        setActiveEvaluations(response.data.data);
        console.log("Klick");
    };

    useEffect( ()=> {
        const fetchUsers = async () => {
            const response = await GetAllUsers();
            console.log(response.data);
            setUsers(response.data);
        };
        fetchUsers()
    },[loggedInUser]);

    if(users.length === 0){
        return(
            <div>
                Loading
            </div>
        )
    }
    return (
        <div>
            <div className="activeEvaluations">
                <h3>ALL ACTIVE EVALUATIONS</h3>
                {activeEvaluations && activeEvaluations.map((activeEvaluation, index) => {
                    if(activeEvaluation.active){
                        const creator = activeEvaluation.creator;
                        const user = users.find(user => user._id === activeEvaluation.e_id);
                        return (
                            //Avatar, Name & role, ansered/total, Overview board, edit eval, currently active, archive button
                            <Box display='flex' flexDirection='row' alignItems='center'>
                            <div className={"activeEvaluation"} key={index}>
                                <activeEvaluation>
                                    <h2>Evaluation index: {index + 1}</h2>
                                    <h4>Employee id: {activeEvaluation.e_id}</h4>
                                    <h4>Creator: {activeEvaluation.creator}</h4>
                                    <p>Picture: {user.picture} </p>
                                    <p>Name: {user.given_name + " "+ user.family_name}</p>
                                    <p>Role: {user.role}</p>
                                    <p>Answered/total: </p>
                                    <p>Overview board</p>
                                    <p>Edit eval</p>
                                    <p>Currently active</p>
                                    <p>Date created</p>
                                </activeEvaluation>
                            </div>
                        </Box>
                    );
                    }
                })
                }
            </div>
        </div>

    );
};

export default ActiveListing;
