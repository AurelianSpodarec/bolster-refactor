import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import { selectCompanyUser } from '../../../selectors/companyAdmin/companyUsers';

const useFetchCompanyUser = userID => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectCompanyUsersIsFetching);
    const fetchError = useSelector(selectCompanyUsersFetchError);
    const companyUser = useSelector(state => selectCompanyUser(state, userID));

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, [dispatch]);

    return { isFetching, fetchError, companyUser };
};

export default useFetchCompanyUser;
