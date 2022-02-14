import fetchTimesheetPinStats from 'actions/companyAdmin/timesheetPinStats/async/fetchTimesheetPinStats';
import { totalArray } from 'helpers/generic';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTimesheetPinStats,
    selectTimesheetPinStatsFetchError,
    selectTimesheetPinStatsIsFetching,
} from 'selectors/companyAdmin/timesheetPinStats';

const usePinStats = (userIDs: number[], startDate: string, endDate: string) => {
    const dispatch = useDispatch();

    const isFetching: boolean = useSelector(selectTimesheetPinStatsIsFetching);
    const fetchError: string | null = useSelector(selectTimesheetPinStatsFetchError);
    const _stats = useSelector(selectTimesheetPinStats);

    useEffect(() => {
        if (userIDs.length) {
            dispatch(fetchTimesheetPinStats(userIDs, startDate, endDate));
        } else {
            dispatch(fetchTimesheetPinStats(null, startDate, endDate));
        }
    }, [dispatch, userIDs, startDate]);

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
