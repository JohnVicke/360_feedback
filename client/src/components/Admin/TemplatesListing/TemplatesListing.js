import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../../react-auth0-spa';
import { GetAllTemplates, GetAllUsers } from '../../../utils/API';
import {
    Box,
    Typography,
    Avatar,
    Grid,
    List,
    ListItem,
    IconButton,
    Button,
} from '@material-ui/core';
import ArchivedListing from '../EvaluationListings/ArchivedListing';
import AddIcon from '@material-ui/icons/Add';
import { Assignment } from '@material-ui/icons';
import Loading from '../../Loading/Loading';

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
        margin: "15px 0",
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: '#F6F6F6',
        width: "95%",
        maxHeight: "20%",
    },

}));
function EmployeeList(props) {
    const classes = useStyles();
    return (
        <List className={classes.EmployeeList} m={"0 0"} alignItems={"center"}>
            {props.templates &&
                props.templates.map((template, index) => {
                    return (
                        <ListItem m={"0"}>
                            <EmployeeBar template={template} />
                        </ListItem>
                    );
                })}
        </List>
    );
}

function EmployeeBar(props) {
    const classes = useStyles();
    return (
        <Box
            className={classes.EmployeeBar}
        >
            <div>
                {console.log(props)}
                <Grid container>
                    <Grid item xs={6}>
                        <Assignment
                            style={{
                                color: '#00000',
                                float: 'left',
                                marginLeft: '10px',
                                width: '60px',
                                height: '60px',
                                marginTop: '10px',
                                marginRight: '10px',
                            }}
                        />

                        <Typography
                            variant='h5'
                            style={{
                                paddingTop: '10px',
                                fontFamily: 'Source Sans Pro',
                                fontWeight: 'bold',
                            }}
                            color='#000000'
                        >
                            {props.template.name}
                        </Typography>
                        <Typography
                            variant='h6'
                            style={{
                                opacity: '0.7',
                                marginTop: '2px',
                                fontFamily: 'Source Sans Pro',
                                fontWeight: 'bold',
                            }}
                            color='#131313'
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
                            <Button
                                aria-label='edit'
                                style={{
                                    backgroundColor: '#4392FE',
                                    color: 'white',
                                    fontSize: '13px',
                                    marginTop: '0.5rem',
                                }}
                            >
                                PREVIEW
                            </Button>
                            <Button
                                aria-label='edit'
                                style={{
                                    backgroundColor: '#472F80',
                                    color: 'white',
                                    fontSize: '13px',
                                    marginTop: '0.5rem',
                                    marginLeft: '1rem',
                                }}
                            >
                                EDIT
                            </Button>
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
        return <Loading />;
    }
    return (
        <div>
            <div className='templates'>
                <EmployeeList templates={templates} />
            </div>
        </div>
    );
};

export default TemplatesListing;
