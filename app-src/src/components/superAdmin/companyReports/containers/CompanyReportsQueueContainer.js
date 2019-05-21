import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCompanyReportsQueue from 'actions/superAdmin/companyReports/async/fetchCompanyReportsQueue';
import CompanyReportsQueue from '../presentational/CompanyReportsQueue';

class CompanyReportsQueueContainer extends Component {
    render = () => <CompanyReportsQueue />;

    componentDidMount = () => this.props.fetchCompanyReportsQueue();
}

const mapDispatchToProps = dispatch => ({
    fetchCompanyReportsQueue: () => dispatch(fetchCompanyReportsQueue())
});

export default connect(
    null,
    mapDispatchToProps
)(CompanyReportsQueueContainer);
