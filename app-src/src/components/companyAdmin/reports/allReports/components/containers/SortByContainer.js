import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertEnumToDropdownOptions } from 'helpers/generic';
import { SORT_BY } from 'constants/companyAdmin/enums';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import SortBy from '../presentational/SortBy';

class SortByContainer extends Component {
    render() {
        const {
            filters: { sortByID }
        } = this.props;

        const sortByOptions = convertEnumToDropdownOptions(SORT_BY);

        return (
            <SortBy
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

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => {
        dispatch(updateReportFilter(name, val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortByContainer);
