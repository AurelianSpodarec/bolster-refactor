import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';

const useFetchCompanyUsers = () => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectCompanyUsersIsFetching);
    const error = useSelector(selectCompanyUsersFetchError);
    const users = useSelector(selectCompanyUsers);

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, [dispatch]);

    return { users, isFetching, error };
};

export default useFetchCompanyUsers;
