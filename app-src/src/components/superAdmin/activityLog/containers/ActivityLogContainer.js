import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchActivityLog from 'actions/companyAdmin/activityLog/async/fetchActivityLog';

import ActivityLog from '../presentational/ActivityLog';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

const ActivityLogContainer = ({
    fetchActivityLog,
    fetchCompanyUsers,
    logs,
    users,
    isFetching,
    error,
}) => {
    useEffect(() => {
        fetchActivityLog();
        fetchCompanyUsers();
    }, []);

    return (
        <ActivityLog
            logs={logs}
            users={users}
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
        companyUsersReducer: {
            users,
            isFetching: isFetchingCompanyUsers,
            error: companyUsersError,
        },
    },
}) => ({
    logs: Object.values(activityLog),
    users,
    isFetching: isFetchingActivityLogs || isFetchingCompanyUsers,
    error: activityLogsError || companyUsersError,
});

const mapDispatchToProps = {
    fetchActivityLog,
    fetchCompanyUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogContainer);
