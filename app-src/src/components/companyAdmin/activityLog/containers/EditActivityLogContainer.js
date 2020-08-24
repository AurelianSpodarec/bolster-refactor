import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchActivityLogSettings from 'actions/companyAdmin/activityLog/async/fetchActivityLogSettings';

import EditActivityLog from '../presentational/EditActivityLog';

const EditActivityLogContainer = ({ fetchActivityLogSettings, settings, isFetching, error }) => {
    useEffect(() => {
        fetchActivityLogSettings();
    }, []);

    return <EditActivityLog settings={settings} isFetching={isFetching} error={error} />;
};

const mapStateToProps = ({
    companyAdmin: {
        activityLogReducer: { settings, isFetching, error },
    },
}) => ({
    settings,
    isFetching,
    error,
});

const mapDispatchToProps = {
    fetchActivityLogSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditActivityLogContainer);
