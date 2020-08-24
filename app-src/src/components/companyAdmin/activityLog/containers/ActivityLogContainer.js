import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchActivityLog from 'actions/companyAdmin/activityLog/async/fetchActivityLog';

import ActivityLog from '../presentational/ActivityLog';

const ActivityLogContainer = ({ fetchActivityLog }) => {
    useEffect(() => {
        fetchActivityLog();
    }, []);

    return <ActivityLog />;
};

const mapDispatchToProps = {
    fetchActivityLog,
};

export default connect(null, mapDispatchToProps)(ActivityLogContainer);
