import React from 'react';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import './CreateEvaluation.css';
import {
    Container,
    Typography,
    Grid,
    Box,
    Avatar,
    TextField,
    Grow,
    IconButton,
    Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { getAllUsers } from '../../utils/API';
import history from '../../utils/history';
import ComboBox from '../AutoComplete/ComboBox';

export default class CreateEvaluation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            addedUsers: [],
            tabValue: 'Active',
        };
    }

    componentDidMount = () => {
        getAllUsers().then((res) => {
            this.setState({
                users: res.data,
            });
            this.state.users.map((user) => { });
        });
    };

    onClickTest = (user) => {
        if (this.state.addedUsers.length >= 1) {
            this.setState({
                addedUsers: this.state.addedUsers.splice(0, 1),
            });
            this.setState({
                addedUsers: this.state.addedUsers.concat(user),
            });
        } else {
            this.setState({
                addedUsers: this.state.addedUsers.concat(user),
            });
        }
    };

    onComboChange = (user) => {
        if (user) this.onClickTest(user);
    };

    getButtonEnabled() {
        return this.state.addedUsers.length === 0;
    }

    render() {
        const comp = this;

        function AddButton(props) {
            if (
                comp.state.addedUsers.findIndex(
                    (x) => x._id == props.user._id
                ) !== -1
            ) {
                return (
                    <IconButton
                        onClick={() => {
                            comp.onClickTest(props.user);
                        }}
                        aria-label='add'
                        style={{ backgroundColor: '#5ABE41', color: 'white' }}
                    >
                        <CheckIcon />
                    </IconButton>
                );
            } else {
                return (
                    <IconButton
                        onClick={() => {
                            comp.onClickTest(props.user);
                        }}
                        aria-label='add'
                        style={{ backgroundColor: '#4392FE', color: 'white' }}
                    >
                        <AddIcon />
                    </IconButton>
                );
            }
        }

        function EmployeeList(props) {
            return (
                <ul style={{ width: '100%', listStyleType: 'none' }}>
                    {props.users.map((user) => {
                        return (
                            <li key={user._id}>
                                <EmployeeBar user={user} />
                            </li>
                        );
                    })}
                </ul>
            );
        }

        function EmployeeBar(props) {
            return (
                <Box
                    className='employeeBar'
                    bgcolor='#F6F6F6'
                    width='0.97'
                    style={{
                        borderRadius: '15px',
                        marginTop: '15px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                    }}
                >
                    <div>
                        <Grid container>
                            <Grid item xs={6}>
                                <Avatar
                                    src={props.user.picture}
                                    style={{
                                        float: 'left',
                                        margin: '15px',
                                        width: '60px',
                                        height: '60px',
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
                                    {props.user.given_name +
                                        ' ' +
                                        props.user.family_name}
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
                                    {props.user.role}
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
                                    <AddButton user={props.user} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            );
        }

        function names() {
            return comp.state.addedUsers.map((user) => {
                return <p>{user.given_name + ' ' + user.family_name}</p>;
            });
        }

        return (
            <div className='background'>
                <AdminNavBar />
                <Grow in={true}>
                    <Container >
                        <Grid
                            direction='row'
                            container
                            justify='center'
                            alignItems='center'
                        >
                            <Box
                                color='#FFFFFF'
                                width={1}
                                alignItems='center'
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
                                    <strong>CREATING EVALUATION:</strong> Who is
                                    being evaluated?
                                    <hr />
                                </Typography>
                            </Box>
                        </Grid>
                        <Box className='mainBox' bgcolor='#222222'>
                            <Grid
                                className='innerGrid'
                                container
                                direction='column'
                                justify='flex-start'

                            >
                                <Grid item>
                                    <Box
                                        display='flex'
                                        justifyContent='center'
                                        style={{ margin: '1rem 0' }}
                                    >
                                        <ComboBox
                                            users={this.state.users}
                                            handleOnChange={this.onComboChange}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item className="employeeGrid" overflow="auto" >
                                    <Box
                                        className='employees'
                                        bgcolor='#222222'
                                        overflow='auto'

                                    >
                                        <Grid
                                            container
                                            direction='row'
                                            justify='center'
                                            alignItems='flex-start'
                                        >
                                            <EmployeeList
                                                users={this.state.users}
                                            />
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="buttons"

                            >
                                <Grid item xs={6}>
                                    <Button
                                        onClick={() => history.goBack()}
                                        variant='outlined'
                                        style={{
                                            borderRadius: '20px',
                                            color: '#F5F5F5',
                                            borderColor: '#4392FE',
                                        }}
                                    >
                                        <Typography variant='button'>
                                            BACK
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        onClick={() =>
                                            history.push({
                                                pathname: '/selectTemplate',
                                                state: {
                                                    user: this.state
                                                        .addedUsers[0],
                                                },
                                            })
                                        }
                                        disabled={this.getButtonEnabled()}
                                        variant='contained'
                                        style={{
                                            float: 'right',
                                            backgroundColor: '#4392FE',
                                            color: '#FFFFFF',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        <Typography variant='button'>
                                            CONTINUE
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Grow>
            </div>
        );
    }
}
