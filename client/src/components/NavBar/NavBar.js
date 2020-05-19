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
import logo from '../../assets/logos/notextlogo.svg';
import AvatarDefault from '../../assets/misc/default.jpeg';

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
        fontFamily: 'Source Sans Pro',
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

    const toProfile = () => {
        handleClose();
        history.push('/profile');
    };

    const handleLogout = () => {
        logout();
        handleClose();
        history.push('/');
    };

    function ProfilePic(props) {
        if (props.user.picture !== undefined || props.user.picture !== null) {
            return (
                <Avatar src={props.user.picture} className={classes.avatar} />
            );
        } else {
            return <Avatar src={AvatarDefault} className={classes.avatar} />;
        }
    }

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
                            <Button onClick={toProfile}>
                                <Avatar src={logo} className={classes.avatar} />
                                <Typography
                                    variant='h6'
                                    className={classes.header}
                                    style={{ color: '#fff' }}
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
                            <ProfilePic user={user} />

                            <Typography
                                variant='h6'
                                className={classes.header}
                                style={{ color: '#fff' }}
                            >
                                {user.name}
                            </Typography>
                        </Button>
                        <Menu
                            className={classes.menu}
                            id='custom-menu'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
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
