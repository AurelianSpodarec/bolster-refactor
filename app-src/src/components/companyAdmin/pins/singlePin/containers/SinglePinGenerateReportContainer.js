import React, { Component } from 'react';
import { connect } from 'react-redux';
import SinglePinGenerateReport from '../presentational/SinglePinGenerateReport';
import generateReport from 'actions/companyAdmin/pins/async/generateReport';

class SinglePinGenerateReportContainer extends Component {
    render() {
        return (
            <SinglePinGenerateReport
                handleGenerateReport={this.handleGenerateReport}
            />
        );
    }

    handleGenerateReport = () => {
        const { generateReport, pinID } = this.props;

        generateReport(pinID);
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
    generateReport: pinID => {
        dispatch(generateReport(pinID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinGenerateReportContainer);
