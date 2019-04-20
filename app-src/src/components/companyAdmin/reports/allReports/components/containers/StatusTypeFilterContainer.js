import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import StatusTypeFilters from '../presentational/StatusTypeFilters';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

class StatusTypeFilterContainer extends Component {
    render() {
        const {
            filters: { statusID }
        } = this.props;

        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);

        return (
            <StatusTypeFilters
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[statusID]}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = ({ target: { value, name } }) => {
        const { updateReportFilter } = this.props;

        updateReportFilter(name, value);
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
)(StatusTypeFilterContainer);
