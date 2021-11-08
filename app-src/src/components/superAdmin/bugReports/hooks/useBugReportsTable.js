import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'helpers/hooks';
import { useHistory } from 'react-router-dom';

import moment from 'moment';
import fetchBugReportList from 'actions/superAdmin/bugReports/fetchBugReportList';

const useBugReportsTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [dates, setDates] = useState({
        dateFrom: moment().subtract(1, 'years').toDate(),
        dateTo: moment().toDate(),
    });

    const { bugReports, isFetching, error, postSuccess } = useSelector(mapStateToProps);
    const prevPostSuccess = usePrevious(postSuccess);

    useEffect(() => {
        dispatch(fetchBugReportList());
    }, [dates]);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            return history.replace('/admin/bug-reports');
        }
    }, [postSuccess, prevPostSuccess]);

    return { dates, setDates, bugReports, isFetching, error };
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
