import fetchTimesheetPinStats from 'actions/companyAdmin/timesheetPinStats/async/fetchTimesheetPinStats';
import { totalArray } from 'helpers/generic';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTimesheetPinStats,
    selectTimesheetPinStatsFetchError,
    selectTimesheetPinStatsIsFetching,
} from 'selectors/companyAdmin/timesheetPinStats';

const usePinStats = (userID, startDate, endDate) => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectTimesheetPinStatsIsFetching);
    const fetchError = useSelector(selectTimesheetPinStatsFetchError);
    const _stats = useSelector(selectTimesheetPinStats);

    useEffect(() => {
        dispatch(fetchTimesheetPinStats(userID, startDate, endDate));
    }, [dispatch, userID, startDate]);

    const stats = {
        statuses: {
            ActionRequired: 0,
            Installed: 0,
            Inspected: 0,
            NoAction: 0,
            Other: 0,
        },
    };

    const datasets = _stats?.historyTimeline?.datasets;
    if (datasets) {
        const { ActionRequired, Installed, Inspected, NoAction, Other } = datasets;
        stats.statuses.ActionRequired = totalArray(ActionRequired);
        stats.statuses.Installed = totalArray(Installed);
        stats.statuses.Inspected = totalArray(Inspected);
        stats.statuses.NoAction = totalArray(NoAction);
        stats.statuses.Other = totalArray(Other);
    }

    return { isFetching, fetchError, stats };
};

export default usePinStats;
