import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import fetchBugReportList from 'actions/superAdmin/bugReports/fetchBugReportList';

const useBugReportsTable = () => {
    const dispatch = useDispatch();

    const [dates, setDates] = useState({
        dateFrom: moment().subtract(1, 'years').toDate(),
        dateTo: moment().toDate(),
    });

    const { bugReports, isFetching, error } = useSelector(mapStateToProps);

    useEffect(() => {
        dispatch(fetchBugReportList());
    }, [dates]);

    return { dates, setDates, bugReports, isFetching, error };
};

const mapStateToProps = ({
    superAdmin: {
        bugReportsReducer: { bugReports, isFetching, error },
    },
}) => ({
    bugReports: Object.values(bugReports),
    isFetching,
    error,
});

export default useBugReportsTable;
