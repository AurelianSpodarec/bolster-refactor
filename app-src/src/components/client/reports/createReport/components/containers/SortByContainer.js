import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertEnumToDropdownOptions } from 'helpers/generic';
import { SORT_BY } from 'constants/companyAdmin/enums';
import clientUpdateReportFilter from 'actions/client/reports/create/sync/clientUpdateReportFilter';
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

    handleChange = (name, value) => {
        const { updateReportFilter } = this.props;

        updateReportFilter(name, value);
    };
}

const mapStateToProps = ({
    client: {
        reportsReducer: { filters }
    }
}) => {
    return {
        filters
    };
};

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => {
        dispatch(clientUpdateReportFilter(name, val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortByContainer);
