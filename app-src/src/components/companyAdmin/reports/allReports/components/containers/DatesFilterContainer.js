import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import DateFilters from '../presentational/DatesFilter';

class DatesFilterContainer extends Component {
    render() {
        const {
            filters: { startDate, endDate }
        } = this.props;

        return (
            <DateFilters
                startDateSelected={startDate}
                endDateSelected={endDate}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = (date, name) => {
        const { updateReportFilter } = this.props;
        updateReportFilter(name, date);
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
)(DatesFilterContainer);
