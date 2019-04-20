import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertEnumToDropdownOptions } from 'helpers/generic';
import { REPORT_FORMATS } from 'constants/companyAdmin/enums';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import ReportFormats from '../presentational/ReportFormats';

class ReportFormatsContainer extends Component {
    render() {
        const {
            filters: { includeLocationDrawing, reportFormatsID }
        } = this.props;

        const reportFormatOptions = convertEnumToDropdownOptions(
            REPORT_FORMATS
        );

        return (
            <ReportFormats
                reportFormatOptions={Object.values(reportFormatOptions)}
                selectedReportFormat={reportFormatOptions[reportFormatsID]}
                handleChange={this.handleChange}
                includeLocationDrawing={includeLocationDrawing}
            />
        );
    }

    handleChange = ({ target: { value, name, checked, type } }) => {
        const { updateReportFilter } = this.props;

        updateReportFilter(name, type === 'checkbox' ? checked : value);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters }
    }
}) => {
    return {
        filters
    };
};

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => {
        dispatch(updateReportFilter(name, val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportFormatsContainer);
