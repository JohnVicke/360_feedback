import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../../../react-auth0-spa';
import {
    makeStyles,
    Box,
    Typography,
    Avatar,
    Paper,
    Card,
    styled,
    Grid,
    IconButton,
    Button,
    spacing,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavBar from '../../NavBar/NavBar';
import ActiveListing from '../EvaluationListings/ActiveListing';
import ArchivedListing from '../EvaluationListings/ArchivedListing';
import TemplatesListing from '../TemplatesListing/TemplatesListing';
import happy from '../../../assets/misc/emoji-happy.svg';
import Profile from '../../Profile/Profile';
import MainMenuTabs from './MainMenuTabs';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import { Link } from 'react-router-dom';

import Tab from '@material-ui/core/Tab';
import EvaluationWaiting from '../../Profile/EvaluationWaiting/EvaluationWaiting';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },
    padding: {
        padding: theme.spacing(3),
    },
    MainMenu: {
        height: '100vh',
        width: '100%',
        overflowY: 'auto',
        background:
            'linear-gradient(45deg, rgba(126,231,119,1) 0, rgba(14,17,24,1) 0%, rgba(38,46,63,1) 100%)',
    },
    tabs: {
        width: '50%',
        margin: '0 auto',
    },
    tab: {
        color: 'white',
        opacity: '0.5',
        '&$selected': {
            color: 'white',
            opacity: '1.0',
            fontWeight: '500',
        },
    },
    selected: {},
}));

const MyCard = styled(Card)({
    background: '#222222',
    border: 0,
    borderRadius: 15,

    margin: '10rem 0',
});

const MainMenu = () => {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState([]);
    const [userEvals, setUserEvals] = useState([]);
    const { loading, user } = useAuth0();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    };

    function returnListing() {
        if (value === 0) {
            return <ActiveListing />;
        }
        if (value === 1) {
            return <ArchivedListing />;
        }
        if (value === 2) {
            return (
                <div>
                    <TemplatesListing />
                    <Link to={{ pathname: '/createTemplate' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            href="#contained-buttons"
                            className={'mx-3'}
                        >
                            Create new template
                        </Button>
                    </Link>
                </div>
            );
        }
    }

    return (
        <div className={classes.MainMenu}>
            <NavBar />
            <Box m={'5rem auto'}>
                <MyCard style={{ margin: '0 20rem' }}>
                    <Paper className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab
                                classes={{
                                    root: classes.tab,
                                    selected: classes.selected,
                                }}
                                label="Active"
                            />
                            <Tab
                                classes={{
                                    root: classes.tab,
                                    selected: classes.selected,
                                }}
                                label="Archived"
                            />
                            <Tab
                                classes={{
                                    root: classes.tab,
                                    selected: classes.selected,
                                }}
                                label="Templates"
                            />
                        </Tabs>
                    </Paper>
                    {returnListing()}
                    <Grid
                        container
                        alignItems="flex-start"
                        justify="flex-end"
                        direction="row"
                    >
                        <Link to={{ pathname: '/createEvaluation' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                href="#contained-buttons"
                                className={'mx-3'}
                            >
                                Create new evaluation
                            </Button>
                        </Link>
                    </Grid>
                </MyCard>
            </Box>
        </div>
    );
};

export default MainMenu;
