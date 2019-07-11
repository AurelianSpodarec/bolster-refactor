import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCompanyReportsQueue from 'actions/superAdmin/companyReports/async/fetchCompanyReportsQueue';
import CompanyReportsQueue from '../presentational/CompanyReportsQueue';

class CompanyReportsQueueContainer extends Component {
    render = () => <CompanyReportsQueue />;

    componentDidMount = () => {
        const { fetchCompanyReportsQueue } = this.props;
        this._interval = setInterval(() => fetchCompanyReportsQueue(), 5000);
    };

    componentWillUnmount = () => clearInterval(this._interval);
}

const mapDispatchToProps = { fetchCompanyReportsQueue };

export default connect(
    null,
    mapDispatchToProps
)(CompanyReportsQueueContainer);
