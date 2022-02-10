import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchSuperAdminTimesheets from 'actions/superAdmin/timesheets/fetchSuperAdminTimesheets';
import {
    selectSuperAdminTimesheetsIsFetching,
    selectSuperAdminTimesheets,
    selectSuperAdminTimesheetsError,
} from 'selectors/superAdmin/timesheets';

const useCompanyTimesheetsTable = () => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectSuperAdminTimesheetsIsFetching);
    const timesheets = Object.values(useSelector(selectSuperAdminTimesheets));
    const error = useSelector(selectSuperAdminTimesheetsError);

    useEffect(() => {
        dispatch(fetchSuperAdminTimesheets());
    }, []);

    return { isFetching, timesheets, error };
};

export default useCompanyTimesheetsTable;
