import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanyReportsQueue from 'actions/superAdmin/companyReports/async/fetchCompanyReportsQueue';
import Dashboard from '../presentational/Dashboard';

class DashboardContainer extends Component {
    render = () => <Dashboard />;

    componentDidMount = () => this.props.fetchCompanyReportsQueue();
}

const mapDispatchToProps = dispatch => ({
    fetchCompanyReportsQueue: () => dispatch(fetchCompanyReportsQueue())
});

export default connect(
    null,
    mapDispatchToProps
)(DashboardContainer);
