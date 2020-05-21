import React, { useEffect, useState } from 'react';
import { IsAdmin } from './API';
import Loading from '../components/Loading/Loading';

const useAdminStatus = (props) => {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const getAdminStatus = async (email) => {
            setIsAdmin(await isAdmin(email));
        };
    });
    if (isAdmin === null) {
        return <Loading fullscreen={true} />;
    }
    return isAdmin;
};

export default useAdminStatus;
