import React, { Component } from 'react';
import { connect } from 'react-redux';
import SinglePinGenerateReport from '../presentational/SinglePinGenerateReport';
import clientGenerateReport from 'actions/client/pins/async/clientGenerateReport';
import { getSelectedCompanyForClient } from 'helpers/generic';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    ERROR_MODAL,
    CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS
} from 'constants/shared/modalTypes';

class SinglePinGenerateReportContainer extends Component {
    render() {
        const { isFetching } = this.props;

        return (
            <SinglePinGenerateReport
                handleGenerateReport={this.handleGenerateReport}
                isFetching={isFetching}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { isFetching, error, success, showModal } = this.props;

        if (prevProps.isFetching && !isFetching && success) {
            showModal(CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS, {});
        }

        if (prevProps.isFetching && !isFetching && error) {
            showModal(ERROR_MODAL, {
                title: 'Error',
                message: error
            });
        }
    };

    handleGenerateReport = () => {
        const { clientGenerateReport, pinID } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        clientGenerateReport(selectedCompanyID, pinID);
    };
}

const mapStateToProps = ({
    client: {
        generatePinReportReducer: { isFetching, error, success }
    }
}) => ({
    isFetching,
    error,
    success
});

const mapDispatchToProps = dispatch => ({
    clientGenerateReport: (companyID, pinID) => {
        dispatch(clientGenerateReport(companyID, pinID));
    },
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinGenerateReportContainer);
