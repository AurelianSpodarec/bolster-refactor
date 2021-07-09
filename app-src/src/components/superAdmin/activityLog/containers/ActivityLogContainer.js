import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchActivityLog from 'actions/superAdmin/activityLog/async/fetchActivityLog';

import ActivityLog from '../presentational/ActivityLog';

const ActivityLogContainer = ({ fetchActivityLog, logs, isFetching, error }) => {
    useEffect(() => {
        fetchActivityLog(null);
    }, []);

    return (
        <ActivityLog
            logs={logs}
            isFetching={isFetching}
            error={error}
            headers={['Name', 'Reference Type', 'Action Type', 'Action By', 'Date']}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        activityLogReducer: {
            activityLog,
            isFetching: isFetchingActivityLogs,
            error: activityLogsError,
        },
    },
}) => ({
    logs: Object.values(activityLog),
    isFetching: isFetchingActivityLogs,
    error: activityLogsError,
});

const mapDispatchToProps = {
    fetchActivityLog,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogContainer);
