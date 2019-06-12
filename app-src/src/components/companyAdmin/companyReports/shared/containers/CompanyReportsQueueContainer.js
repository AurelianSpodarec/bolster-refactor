import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import CompanyReports from '../presentational/CompanyReports';

class CompanyReportsQueueContainer extends Component {
    render = () => <CompanyReports />;

    componentDidMount = () => {
        const { fetchCompanyReports } = this.props;
        this._interval = setInterval(() => fetchCompanyReports(), 5000);
    };
    componentWillUnmount = () => clearInterval(this._interval);
}

const mapDispatchToProps = { fetchCompanyReports };

export default connect(
    null,
    mapDispatchToProps
)(CompanyReportsQueueContainer);
