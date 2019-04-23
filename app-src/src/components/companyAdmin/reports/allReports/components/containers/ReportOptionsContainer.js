import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import ReportOptions from '../presentational/ReportOptions';

class ReportOptionsContainer extends Component {
    render() {
        return <ReportOptions />;
    }
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
)(ReportOptionsContainer);
