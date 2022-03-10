import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchClientCompanyReports from 'actions/client/reports/queue/async/fetchClientCompanyReports';
import CompanyReports from '../presentational/CompanyReports';
import { getSelectedCompanyForClient } from 'helpers/generic';
import { MESSAGE_TYPES } from '../../../../../constants/companyAdmin/enums';
import clientDismissMessages from '../../../../../actions/client/messages/async/clientDismissMessages';

class CompanyReportsQueueContainer extends Component {
    render = () => <CompanyReports />;

    componentDidMount = () => {
        const { fetchClientCompanyReports, clientDismissMessages } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        clientDismissMessages();

        this._interval = setInterval(() => fetchClientCompanyReports(selectedCompanyID), 5000);
    };
    componentWillUnmount = () => clearInterval(this._interval);
}

const mapDispatchToProps = dispatch => ({
    fetchClientCompanyReports: companyID => dispatch(fetchClientCompanyReports(companyID)),
    clientDismissMessages: () => dispatch(clientDismissMessages(MESSAGE_TYPES.NOTIFICATION)),
});

export default connect(null, mapDispatchToProps)(CompanyReportsQueueContainer);
