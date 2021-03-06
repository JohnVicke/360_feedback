import React, {useState, useEffect} from 'react';
import {useAuth0} from '../../../react-auth0-spa';
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
import Employees from '../Employees/Employees';
import AdminNavBar from '../../AdminNavBar/AdminNavBar';
import ActiveListing from '../EvaluationListings/ActiveListing';
import ArchivedListing from '../EvaluationListings/ArchivedListing';
import TemplatesListing from '../TemplatesListing/TemplatesListing';
import EmployeeListing from '../Employees/EmployeeListing';
import happy from '../../../assets/misc/emoji-happy.svg';
import Profile from '../../Profile/Profile';
import MainMenuTabs from './MainMenuTabs';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import {Link} from 'react-router-dom';
import history from '../../../utils/history';

import CreateIcon from '@material-ui/icons/Create';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Tab from '@material-ui/core/Tab';
import EvaluationWaiting from '../../Profile/EvaluationWaiting/EvaluationWaiting';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
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
    MenuBox: {
        background: '#222222',
        border: 0,
        borderRadius: 15,
        margin: '2rem 10rem',
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
        maxHeight: '100vh',
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
    BottomRow: {},

    selected: {},

    CreateNewTemplateButton: {
        float: 'left',
        margin: '5px 32px',
        backgroundColor: '#4392FE',
        borderRadius: '20px',
    },
}));

const MainMenu = () => {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState([]);
    const [userEvals, setUserEvals] = useState([]);
    const {loading, user} = useAuth0();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function returnListing() {
        if (value === 0) {
            return <ActiveListing/>;
        }
        if (value === 1) {
            return <ArchivedListing/>;
        }
        if (value === 2) {
            return (
                <div>
                    <TemplatesListing/>
                </div>
            );
        }
        if (value === 3) {
            return <EmployeeListing/>;
        }
    }

    function returnButton() {
        if (value === 2) {
            return (
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.CreateNewTemplateButton}
                    onClick={() =>
                        history.push({
                            pathname: '/createTemplate',
                        })
                    }
                >
                    <CreateIcon style={{marginRight: '5px'}}/>
                    Create new template
                </Button>
            );
        }
        if (value === 3) {
            return (
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.CreateNewTemplateButton}
                    onClick={() => history.push('/add_user')}
                >
                    <CreateIcon style={{marginRight: '5px'}}/>
                    Add user
                </Button>
            );
        }
    }

    return (
        <div className={classes.MainMenu}>
            <AdminNavBar />
            <Box
                color='#FFFFFF'
                width={1}
                style={{ margin: '1rem 0' }}
                textAlign='center'
            >
                <Typography
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '24px',
                        fontFamily: 'Source Sans Pro',
                        fontWeight: '400',
                        textTransform: 'uppercase',
                        marginTop: '0.5rem',
                    }}
                >
                    <strong>Main menu</strong>
                    <hr style={{ margin: '0 10rem' }} />
                </Typography>
            </Box>
            <Box className={classes.MenuBox} justifyContent={'center'}>
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='primary'
                        textColor='primary'
                        centered
                    >
                        <Tab
                            classes={{
                                root: classes.tab,
                                selected: classes.selected,
                            }}
                            label='Active'
                        />
                        <Tab
                            classes={{
                                root: classes.tab,
                                selected: classes.selected,
                            }}
                            label='Archived'
                        />
                        <Tab
                            classes={{
                                root: classes.tab,
                                selected: classes.selected,
                            }}
                            label='Templates'
                        />
                        <Tab
                            classes={{
                                root: classes.tab,
                                selected: classes.selected,
                            }}
                            label='Users'
                        />
                    </Tabs>
                </Paper>
                {returnListing()}
                <Grid
                    container
                    alignItems='flex-start'
                    justify='center'
                    direction='row'
                >
                    <Grid
                        container
                        alignItems='flex-start'
                        justify='flex-end'
                        direction='row'
                        style={{width: "90%"}}
                    >
                        <Grid item xs={6}>
                            {returnButton()}
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant='contained'
                                color='primary'
                                style={{
                                    float: 'right',
                                    margin: '5px 32px',
                                    backgroundColor: '#4392FE',
                                    borderRadius: '20px',
                                }}
                                onClick={() => history.push('/selectEvaluatee')}
                            >
                                <PostAddIcon style={{marginRight: '5px'}}/>
                                Create new evaluation
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default MainMenu;
