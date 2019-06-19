import React from 'react';
import { connect } from 'react-redux';
import fetchAllOperativeAlerts from 'actions/companyAdmin/operativeAlerts/async/fetchAllOperativeAlerts';
import AllOperativeAlerts from '../presentational/AllOperativeAlerts';
import { componentDidMount } from 'helpers/generic';

const AllOperativeAlertsContainer = ({ fetchAllOperativeAlerts }) => {
    componentDidMount(fetchAllOperativeAlerts);
    return <AllOperativeAlerts />;
};

const mapDispatchToProps = { fetchAllOperativeAlerts };

export default connect(
    null,
    mapDispatchToProps
)(AllOperativeAlertsContainer);
