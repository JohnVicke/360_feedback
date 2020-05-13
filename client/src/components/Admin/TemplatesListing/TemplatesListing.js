import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { useAuth0 } from '../../../react-auth0-spa';
import {GetAllTemplates, GetAllUsers} from '../../../utils/API';
import {Box, Typography} from '@material-ui/core';
import ArchivedListing from "../EvaluationListings/ArchivedListing";
import Loading from "../../"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const TemplatesListing = () => {
    const classes = useStyles();
    const [templates, setTemplates] = useState([]);
    const { loggedInUser } = useAuth0();

    useEffect( ()=> {
        const fetchTemplates = async () => {
            const response = await GetAllTemplates();
            console.log(response.data.data);
            setTemplates(response.data.data);
        };
        fetchTemplates()
    },[loggedInUser]);

    if(templates.length === 0){
        return(
            <div>
                Loading..
            </div>
        )
    }
    return(
        <div>
            <div className="templates">
                <h3>ALL templates</h3>
                {templates && templates.map((template, index) => {
                    console.log("Index:" + index + " Name: " + template.name)
                    return(
                        <Box display='flex' flexDirection='row' alignItems='center'>
                            <h2>Template name: {template.name}</h2>
                            <p>{template.description}</p>
                        </Box>
                    );
                })}
            </div>
        </div>
    );

};

export default TemplatesListing;


