import React from 'react';
import NavBar from '../NavBar/NavBar';
import './CreateEvaluation.css';
import history from '../../utils/history';
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
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { getAllUsers } from '../../utils/API';
import ComboBox from '../AutoComplete/ComboBox';

export default class CreateEvaluation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            addedUsers: [],
            tabValue: 'Active',
            template: {},
            user: {},
        };
    }

    componentDidMount = () => {
        const { user, template } = this.props.location.state;

        getAllUsers().then((res) => {
            let startUsers = [];
            startUsers.push(user);
            this.setState({
                users: res.data,
                template: template,
                user: user,
                addedUsers: startUsers,
            });
            this.state.users.map((user) => { });
        });
    };

    onClickTest = (user) => {
        if (this.state.addedUsers.findIndex((x) => x._id == user._id) !== -1) {
            this.setState({
                addedUsers: this.state.addedUsers.filter(
                    (currentUser) => currentUser._id !== user._id
                ),
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
                <NavBar />
                <Grow in={true}>
                    <Container>
                        <Grid
                            direction='row'
                            container
                            justify='center'
                            alignItems='center'
                        >
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
                                    <strong>CREATING EVALUATION:</strong> Choose
                                    evaluators
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
                                        variant='outlined'
                                        style={{
                                            borderRadius: '20px',
                                            color: '#F5F5F5',
                                            borderColor: '#4392FE',
                                        }}
                                    >
                                        <Typography
                                            variant='button'
                                            onClick={() => history.goBack()}
                                        >
                                            BACK
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant='contained'
                                        style={{
                                            float: 'right',
                                            backgroundColor: '#4392FE',
                                            color: '#FFFFFF',
                                            borderRadius: '20px',
                                        }}
                                        onClick={() =>
                                            history.push({
                                                pathname: '/double_check',
                                                state: {
                                                    user: this.state.user,
                                                    template: this.state
                                                        .template,
                                                    users: this.state
                                                        .addedUsers,
                                                },
                                            })
                                        }
                                        disabled={this.getButtonEnabled()}
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
