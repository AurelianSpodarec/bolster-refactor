import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchActivityLog from 'actions/companyAdmin/activityLog/async/fetchActivityLog';

import EditActivityLog from '../presentational/EditActivityLog';

const EditActivityLogContainer = ({ fetchActivityLog, logs, isFetching, error }) => {
    useEffect(() => {
        fetchActivityLog();
    }, []);

    return <EditActivityLog logs={logs} isFetching={isFetching} error={error} />;
};

const mapStateToProps = ({
    companyAdmin: {
        activityLogReducer: { activityLog, isFetching, error },
    },
}) => ({
    logs: activityLog,
    isFetching,
    error,
});

const mapDispatchToProps = {
    fetchActivityLog,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditActivityLogContainer);
