import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchBugReport from 'actions/superAdmin/bugReports/fetchBugReport.';

const useBugReport = reportID => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBugReport(reportID));
    }, []);

    const bugReport = useSelector(state => state.superAdmin.bugReportsReducer.bugReports[reportID]);
    const isFetching = useSelector(state => state.superAdmin.bugReportsReducer.isFetching);
    const error = useSelector(state => state.superAdmin.bugReportsReducer.error);

    return { bugReport, isFetching, error };
};

export default useBugReport;
