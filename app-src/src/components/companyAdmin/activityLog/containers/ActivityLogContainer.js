import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchActivityLog from 'actions/companyAdmin/activityLog/async/fetchActivityLog';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

import ActivityLog from '../presentational/ActivityLog';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

const ActivityLogContainer = ({
    fetchActivityLog,
    fetchCompanyUsers,
    logs,
    users,
    companyUserType,
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
            isOwner={companyUserType === COMPANY_USER_ROLE_TYPES.OWNER}
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
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserType },
        },
    },
}) => ({
    logs: Object.values(activityLog),
    users,
    companyUserType,
    isFetching: isFetchingActivityLogs || isFetchingCompanyUsers,
    error: activityLogsError || companyUsersError,
});

const mapDispatchToProps = {
    fetchActivityLog,
    fetchCompanyUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogContainer);
