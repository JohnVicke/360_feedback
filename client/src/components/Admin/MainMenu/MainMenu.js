import React, { useState, useEffect } from 'react';
import {useAuth0} from '../../../react-auth0-spa'
import { makeStyles, Box, Typography, Avatar } from '@material-ui/core';
import NavBar from '../../NavBar/NavBar';
import ActiveListing from "../EvaluationListings/ActiveListing";
import ArchivedListing from "../EvaluationListings/ArchivedListing"
import TemplatesListing from "../TemplatesListing/TemplatesListing"
import happy from "../../../assets/misc/emoji-happy.svg";
import Profile from "../../Profile/Profile";
import MainMenuTabs from "./MainMenuTabs";
import {withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > div': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    },
    MainMenu: {
        height: '100vh',
        background: 'linear-gradient(45deg, rgba(126,231,119,1) 0, rgba(14,17,24,1) 0%, rgba(38,46,63,1) 100%)',
    },
    tabs: {
        backgroundColor: '#2e1534',
    },
}));



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

    function returnListing (){
        if(value === 0){
            return (<ActiveListing/>)
        }
        if(value === 1){
            return (<ArchivedListing/>)
        }
        if(value === 2){
            return (<TemplatesListing/>)
        }
    }

    return(
            <div className={classes.MainMenu}>
                <div className={classes.tabs}>
                    <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                        <StyledTab label="Active" />
                        <StyledTab label="Archived" />
                        <StyledTab label="Templates" />
                    </StyledTabs>
                    <Typography className={classes.padding} />
                </div>

                {returnListing()}
            </div>
        );
};

export default MainMenu;