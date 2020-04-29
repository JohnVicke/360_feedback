import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';

import { useHistory } from 'react-router-dom';
import {
    AppBar,
    Button,
    Toolbar,
    ThemeProvider,
    Typography,
    createMuiTheme,
    Box,
    Avatar,
    makeStyles,
    Menu,
    MenuItem,
} from '@material-ui/core';

import logo from '../../assets/logo/notextlogo.svg';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#0E1118',
        },
    },
});

const useStyles = makeStyles({
    avatar: {
        marginRight: '1rem',
    },

    navbar: {
        padding: '0 6rem',
        fontFamily: 'Source Sans Pro',
    },

    header: {
        fontWeight: '700',
        letterSpacing: '2px',
        textTransform: 'none',
    },

    menu: {
        marginTop: '3rem',
    },
});

const NavBar = () => {
    const { logout, user } = useAuth0();
    const history = useHistory();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toHome = () => {
        history.push('/');
    };

    const toProfile = () => {
        handleClose();
        history.push('/profile');
    };

    const handleLogout = () => {
        logout();
        handleClose();
        history.push('/');
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar
                    position='static'
                    color='primary'
                    className={classes.navbar}
                >
                    <Toolbar>
                        <Box display='flex' flexGrow={1}>
                            <Button onClick={toHome}>
                                <Avatar src={logo} className={classes.avatar} />
                                <Typography
                                    variant='h6'
                                    className={classes.header}
                                >
                                    360 Feedback
                                </Typography>
                            </Button>
                        </Box>
                        <Button
                            edge='end'
                            onClick={handleMenu}
                            aria-haspopup='true'
                            aria-controls='custom-menu'
                        >
                            <Avatar
                                src={user.picture}
                                className={classes.avatar}
                            />
                            <Typography variant='h6' className={classes.header}>
                                {user.name} Viktor Malmedal
                            </Typography>
                        </Button>
                        <Menu
                            className={classes.menu}
                            id='custom-menu'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'left',
                                horizontal: 'top',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={toProfile}
                                className={classes.menuitem}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={handleLogout}
                                className={classes.menuitem}
                            >
                                Log out
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
};

export default NavBar;
