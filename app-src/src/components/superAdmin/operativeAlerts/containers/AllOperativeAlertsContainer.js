import React from 'react';
import { connect } from 'react-redux';

import AllOperativeAlerts from '../presentational/AllOperativeAlerts';
import adminFetchOperativeAlerts from 'actions/superAdmin/operativeAlerts/async/AdminFetchOperativeAlerts';
import { componentDidMount } from 'helpers/generic';

const AllOperativeAlertsContainer = ({ adminFetchOperativeAlerts }) => {
    componentDidMount(adminFetchOperativeAlerts);
    return <AllOperativeAlerts />;
};

const mapDispatchToProps = { adminFetchOperativeAlerts };

export default connect(
    null,
    mapDispatchToProps
)(AllOperativeAlertsContainer);
