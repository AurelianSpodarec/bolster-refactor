import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchBugReport from 'actions/superAdmin/bugReports/fetchBugReport.';

const useBugReport = reportID => {
    const dispatch = useDispatch();
    const bugReport = useSelector(state => state.superAdmin.bugReportsReducer.bugReports[reportID]);

    useEffect(() => {
        dispatch(fetchBugReport(reportID));
    }, []);

    return { bugReport };
};

export default useBugReport;
