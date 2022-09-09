import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'helpers/hooks';
import { useHistory } from 'react-router-dom';

import fetchBugReport from 'actions/superAdmin/bugReports/fetchBugReport.';

const useBugReport = reportID => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchBugReport(reportID));
    }, []);

    const bugReport = useSelector(state => state.superAdmin.bugReportsReducer.bugReports[reportID]);
    const isFetching = useSelector(state => state.superAdmin.bugReportsReducer.isFetching);
    const error = useSelector(state => state.superAdmin.bugReportsReducer.error);
    const postSuccess = useSelector(state => state.superAdmin.bugReportsReducer.postSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            history.replace('/admin/bug-reports');
        }
    }, [postSuccess, prevPostSuccess]);

    return { bugReport, isFetching, error };
};

export default useBugReport;
