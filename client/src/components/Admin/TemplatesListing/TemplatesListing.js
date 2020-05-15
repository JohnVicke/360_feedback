import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../../react-auth0-spa';
import { GetAllTemplates, GetAllUsers } from '../../../utils/API';
import { Box, Typography, Avatar, Grid, IconButton } from '@material-ui/core';
import ArchivedListing from '../EvaluationListings/ArchivedListing';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../../Loading/Loading'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
function EmployeeList(props) {
    return (
        <ul style={{ width: '100%', listStyleType: 'none' }}>
            {props.templates &&
                props.templates.map((template, index) => {
                    return (
                        <li>
                            <EmployeeBar template={template} />
                        </li>
                    );
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
                            src={
                                'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/document-app-icon-or-logo-icon-design-template-7b6cac8de4b9abdd949f7643fe00924e_screen.jpg?ts=1576967977'
                            }
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
                            {props.template.name}
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
                            {props.template.description}
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

const TemplatesListing = () => {
    const classes = useStyles();
    const [templates, setTemplates] = useState([]);
    const { loggedInUser } = useAuth0();

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await GetAllTemplates();
            console.log(response.data.data);
            setTemplates(response.data.data);
        };
        fetchTemplates();
    }, [loggedInUser]);

    if (templates.length === 0) {
        return <Loading/>
    }
    return (
        <div>
            <div className="templates">
                <EmployeeList templates={templates} />
            </div>
        </div>
    );
};

export default TemplatesListing;
