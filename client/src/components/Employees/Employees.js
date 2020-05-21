import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../utils/API';
import Loading from '../Loading/Loading';
import { Box, Button } from '@material-ui/core';
import history from '../../utils/history';

const Employees = (props) => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const { data } = await getAllUsers();
            setEmployees(data);
        };
        getUsers();
    }, [setEmployees]);

    if (!employees) return <Loading fullscreen={true} />;

    return (
        <div>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                {employees.map((e) => (
                    <div
                        style={{
                            fontFamily: 'Source Sans Pro',
                            fontSize: '1rem',
                            color: '#fff',
                            margin: '1em',
                        }}
                    >{`${e.given_name} ${e.family_name} ${e.role}`}</div>
                ))}
                <Button onClick={() => history.push('/add_user')}>
                    Add user
                </Button>
            </Box>
        </div>
    );
};

export default Employees;
