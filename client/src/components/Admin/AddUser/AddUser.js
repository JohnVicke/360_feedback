import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Box,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { CenterFocusStrong } from '@material-ui/icons';
import history from '../../../utils/history';
import { CreateUser } from '../../../utils/API';

const useStyles = makeStyles({
    background: {
        height: '100%',
        display: 'flex',
        overflowY: 'hidden',
        minHeight: '100vh',
        background: 'rgb(126,231,119)',
        background:
            'linear-gradient(45deg, rgba(126,231,119,1) 0, rgba(14,17,24,1) 0%, rgba(38,46,63,1) 100%)',
    },
    column: {
        margin: '10% auto',
        color: '#fff',
        fontSize: '200px',
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Source Sans Pro',
        fontWeight: 600,
        fontSize: '50px',
    },
    textField: {
        margin: '0.3rem',
        '& label': {
            color: '#fff',
        },
        '& label.Mui-focused': {
            color: '#fff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            width: '25rem',
            '& fieldset': {
                borderColor: '#fff',
            },
            '&:hover fieldset': {
                borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    },
    backButton: {
        borderRadius: '20px',
        color: '#F5F5F5',
        borderColor: '#4392FE',
        margin: '0.4rem 0 ',
    },
    addButton: {
        backgroundColor: '#4392FE',
        color: '#FFFFFF',
        borderRadius: '20px',
        margin: '0.4rem 0',
    },
    buttonBox: {
        width: '25rem',
    },
});

const AddUser = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(false);
    const [roleError, setRoleError] = useState(false);

    function validateEmail() {
        var re = /\S+@gmail.com/;
        return re.test(email);
    }
    function validateRole() {
        return role.length === 0;
    }

    async function addUser() {
        setError(false);
        setRoleError(false);
        let isError = false;
        if (!validateEmail()) {
            setError(true);
            isError = true;
        }
        if (validateRole()) {
            setRoleError(true);
            isError = true;
        }
        if (!isError) {
            const user = {
                given_name: 'Givenname',
                family_name: 'Familyname',
                role: role,
                email: email,
                responses: [],
                picture:
                    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            };
            const res = await CreateUser(user);
            setEmail('');
            setRole('');
        }
    }

    return (
        <div className={classes.background}>
            <Box
                className={classes.column}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <AccountCircleIcon color="inherit" fontSize="inherit" />
                <Typography className={classes.title}>Add user</Typography>
                <TextField
                    error={error}
                    label="Gmail adress"
                    id="custom-css-outlined-input"
                    variant="outlined"
                    className={classes.textField}
                    onChange={(e, n) => {
                        setEmail(e.target.value);
                    }}
                    InputProps={{
                        style: {
                            color: 'white',
                            fontFamily: 'Source Sans Pro',
                        },
                    }}
                    value={email}
                    helperText={error ? 'You must enter a gmail adress.' : ''}
                ></TextField>
                <TextField
                    error={roleError}
                    label="Role"
                    id="custom-css-outlined-input"
                    variant="outlined"
                    className={classes.textField}
                    onChange={(e, n) => {
                        setRole(e.target.value);
                    }}
                    InputProps={{
                        style: {
                            color: 'white',
                            fontFamily: 'Source Sans Pro',
                        },
                    }}
                    value={role}
                    helperText={roleError ? 'Role cannot be empty' : ''}
                ></TextField>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    className={classes.buttonBox}
                >
                    <Button
                        onClick={() => history.goBack()}
                        variant="outlined"
                        className={classes.backButton}
                    >
                        <Typography
                            variant="button"
                            style={{ padding: '0 0.5rem' }}
                        >
                            BACK
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.addButton}
                        onClick={addUser}
                    >
                        <Typography
                            variant="button"
                            style={{ padding: '0 1rem' }}
                        >
                            Add
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default AddUser;
