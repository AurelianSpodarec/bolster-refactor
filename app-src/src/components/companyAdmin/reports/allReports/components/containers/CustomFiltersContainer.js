import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertEnumToDropdownOptions } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import SortBy from '../presentational/SortBy';

class CustomFiltersContainer extends Component {
    render() {
        const {
            filters: {}
        } = this.props;

        //post hierachyType / hierachyID to get the questions

        return (
            <CustomFilters
                sortByOptions={Object.values(sortByOptions)}
                selectedSortBy={sortByOptions[sortByID]}
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

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters }
    }
}) => ({
    filters
});

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => {
        dispatch(updateReportFilter(name, val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinFiltersFormContainer);
