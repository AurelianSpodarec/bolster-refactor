import React, { Component } from 'react';
import { connect } from 'react-redux';
import SinglePinGenerateReport from '../presentational/SinglePinGenerateReport';
import clientGenerateReport from 'actions/client/pins/async/clientGenerateReport';
import { getSelectedCompanyForClient } from 'helpers/generic';

class SinglePinGenerateReportContainer extends Component {
    render() {
        return (
            <SinglePinGenerateReport
                handleGenerateReport={this.handleGenerateReport}
            />
        );
    }

    handleGenerateReport = () => {
        const { clientGenerateReport, pinID } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        clientGenerateReport(selectedCompanyID, pinID);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        generatePinReportReducer: { isFetching }
    }
}) => ({
    isFetching
});

const mapDispatchToProps = dispatch => ({
    clientGenerateReport: (companyID, pinID) => {
        dispatch(clientGenerateReport(companyID, pinID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinGenerateReportContainer);
