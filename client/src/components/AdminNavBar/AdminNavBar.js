import React, { useState, useRef } from 'react';
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
    MenuItem,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
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

const AdminNavBar = () => {
    const { logout, user } = useAuth0();
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target))
            return;

        setOpen(false);
    };

    const toMainMenu = () => {
        history.push('/');
    };

    const toAddUser = () => {
        history.push('/add_user');
    };

    const toProfile = () => {
        history.push('/profile');
    };

    const handleLogout = () => {
        logout();
    };

    function ProfilePic(props) {
        if (props.user.picture != undefined) {
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
                            <Button onClick={toMainMenu}>
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
                        <p style={{ marginRight: '1em' }}>
                            Logged in <br />
                            as admin
                        </p>
                        <Button
                            onClick={handleToggle}
                            ref={anchorRef}
                            aria-haspopup='true'
                            aria-controls={open ? 'menu-list-grow' : undefined}
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
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom'
                                                ? 'center top'
                                                : 'center bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener
                                            onClickAway={handleClose}
                                        >
                                            <MenuList
                                                autoFocusItem={open}
                                                id='menu-list-grow'
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem
                                                    onClick={() =>
                                                        history.push(
                                                            '/main_menu'
                                                        )
                                                    }
                                                >
                                                    Main Menu
                                                </MenuItem>
                                                <MenuItem onClick={toProfile}>
                                                    Profile
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>{' '}
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
};

export default AdminNavBar;
