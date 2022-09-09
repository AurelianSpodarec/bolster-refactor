import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'helpers/hooks';
import { useHistory } from 'react-router-dom';

import fetchBugReportList from 'actions/superAdmin/bugReports/fetchBugReportList';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import patchBugReportStatus from 'actions/superAdmin/bugReports/patchBugReportStatus';

const useBugReportsTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { bugReports, isFetching, error, postSuccess } = useSelector(mapStateToProps);
    const prevPostSuccess = usePrevious(postSuccess);

    useEffect(() => {
        dispatch(fetchBugReportList());
    }, []);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            dispatch(hideModal());
            dispatch(fetchBugReportList());
            history.replace('/admin/bug-reports');
        }
    }, [postSuccess, prevPostSuccess]);

    const handleViewBugReport = id => {
        history.push(`/admin/bug-reports/${id}`);
    };

    const handleMarkRead = id => {
        dispatch(patchBugReportStatus(id));
    };

    return { bugReports, isFetching, error, handleViewBugReport, handleMarkRead };
};

const mapStateToProps = ({
    superAdmin: {
        bugReportsReducer: { bugReports, isFetching, error, postSuccess },
    },
}) => ({
    bugReports: Object.values(bugReports),
    isFetching,
    error,
    postSuccess,
});

export default useBugReportsTable;
