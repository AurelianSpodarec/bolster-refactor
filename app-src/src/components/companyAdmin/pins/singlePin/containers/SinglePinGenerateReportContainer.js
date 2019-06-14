import React, { Component } from 'react';
import { connect } from 'react-redux';
import SinglePinGenerateReport from '../presentational/SinglePinGenerateReport';
import generateReport from 'actions/companyAdmin/pins/async/generateReport';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    ERROR_MODAL,
    SINGLE_PIN_GENERATE_REPORT_SUCCESS
} from 'constants/shared/modalTypes';

class SinglePinGenerateReportContainer extends Component {
    render() {
        const { isFetching } = this.props;

        return (
            <SinglePinGenerateReport
                isFetching={isFetching}
                handleGenerateReport={this.handleGenerateReport}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { isFetching, success, error, showModal } = this.props;

        if (prevProps.isFetching && !isFetching && success) {
            showModal(SINGLE_PIN_GENERATE_REPORT_SUCCESS, {});
        }

        if (prevProps.isFetching && !isFetching && error) {
            showModal(ERROR_MODAL, {
                title: 'Error',
                message: error
            });
        }
    };

    handleGenerateReport = () => {
        const { generateReport, pinID } = this.props;

        generateReport(pinID);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        generatePinReportReducer: { isFetching, error, success }
    }
}) => ({
    isFetching,
    error,
    success
});

const mapDispatchToProps = dispatch => ({
    generateReport: pinID => {
        dispatch(generateReport(pinID));
    },
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinGenerateReportContainer);
