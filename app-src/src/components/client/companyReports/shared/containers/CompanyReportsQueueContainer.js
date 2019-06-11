import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchClientCompanyReports from 'actions/client/reports/queue/async/fetchClientCompanyReports';
import CompanyReports from '../presentational/CompanyReports';
import { getSelectedCompanyForClient } from 'helpers/generic';

class CompanyReportsQueueContainer extends Component {
    render = () => <CompanyReports />;

    componentDidMount = () => {
        const { fetchClientCompanyReports } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();
        this._interval = setInterval(
            () => fetchClientCompanyReports(selectedCompanyID),
            5000
        );
    };
    componentWillUnmount = () => clearInterval(this._interval);
}

const mapDispatchToProps = dispatch => ({
    fetchClientCompanyReports: companyID =>
        dispatch(fetchClientCompanyReports(companyID))
});

export default connect(
    null,
    mapDispatchToProps
)(CompanyReportsQueueContainer);
