import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';

const useWages = () => {
    const dispatch = useDispatch();
    const [userFilter, setUserFilter] = useState('');

    const companyUsers = useSelector(selectCompanyUsers) || [];
    const isFetching = useSelector(selectCompanyUsersIsFetching);
    const fetchError = useSelector(selectCompanyUsersFetchError);

    const filteredUsers = useMemo(() => {
        const users = Object.values(companyUsers);
        return users.filter(({ userFirstName, userLastName }) =>
            `${userFirstName} ${userLastName}`
                .toLowerCase()
                .includes(userFilter.trim().toLowerCase()),
        );
    }, [companyUsers, userFilter]);

    useEffect(() => {
        dispatch(fetchCompanyUsers);
    }, []);

    return {
        userFilter,
        setUserFilter,
        users: filteredUsers,
        isFetching,
        fetchError,
    };
};

export default useWages;
