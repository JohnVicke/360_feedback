import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../utils/API';
import Loading from '../Loading/Loading';
import { Box } from '@material-ui/core';

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
                {employees.map((e) => e.family_name)};
            </Box>{' '}
        </div>
    );
};

export default Employees;
