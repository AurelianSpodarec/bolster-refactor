import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchAllWorkingHours from 'actions/companyAdmin/workingHours/async/fetchAllWorkingHours';

import {
    selectUserWorkingHours,
    selectWorkingHoursIsFetching,
} from 'selectors/companyAdmin/workingHours';

const useGetCompanyUsersWorkingHours = selectedUserID => {
    const dispatch = useDispatch();

    const workingHours = useSelector(state => selectUserWorkingHours(state, selectedUserID));

    const isFetching = useSelector(selectWorkingHoursIsFetching);

    useEffect(() => {
        dispatch(fetchAllWorkingHours());
    }, []);

    return { workingHours, isFetching };
};

export default useGetCompanyUsersWorkingHours;
