import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchClientCompanyReports from 'actions/client/reports/queue/async/fetchClientCompanyReports';
import CompanyReports from '../presentational/CompanyReports';
import { getSelectedCompanyForClient } from 'helpers/generic';
import { MESSAGE_TYPES } from '../../../../../constants/companyAdmin/enums';
import dismissMessages from '../../../../../actions/companyAdmin/messages/async/dismissMessages';

class CompanyReportsQueueContainer extends Component {
    render = () => <CompanyReports />;

    componentDidMount = () => {
        const { fetchClientCompanyReports, dismissMessages } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        dismissMessages();

        this._interval = setInterval(() => fetchClientCompanyReports(selectedCompanyID), 5000);
    };
    componentWillUnmount = () => clearInterval(this._interval);
}

const mapDispatchToProps = dispatch => ({
    fetchClientCompanyReports: companyID => dispatch(fetchClientCompanyReports(companyID)),
    dismissMessages: () => dispatch(dismissMessages(MESSAGE_TYPES.NOTIFICATION)),
});

export default connect(null, mapDispatchToProps)(CompanyReportsQueueContainer);
