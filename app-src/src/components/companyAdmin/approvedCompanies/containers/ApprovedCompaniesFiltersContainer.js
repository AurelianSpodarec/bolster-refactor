import React from 'react';

import updateApprovedCompaniesFilters from 'actions/companyAdmin/approvedCompanies/sync/updateApprovedCompaniesFilters';

import { connect } from 'react-redux';

import ApprovedCompaniesFilters from '../presentational/ApprovedCompaniesFilters';
import updateApprovedCompaniesSort from 'actions/companyAdmin/approvedCompanies/sync/updateApprovedCompaniesSort';

// TODO: add filters

const ApprovedCompaniesFiltersContainer = ({
    filters: { name },
    sort,
    updateApprovedCompaniesFilters,
    updateApprovedCompaniesSort
}) => {
    const handleChange = (name, value) => {
        updateApprovedCompaniesFilters(name, value);
    };

    const handleSortChange = (_, value) => {
        updateApprovedCompaniesSort(value);
    };

    const sortOptions = {
        'A - Z': { value: 'A - Z', text: 'A - Z' },
        'Z - A': { value: 'Z - A', text: 'Z - A' }
    };

    return (
        <ApprovedCompaniesFilters
            handleChange={handleChange}
            handleSortChange={handleSortChange}
            name={name}
            sortOptions={Object.values(sortOptions)}
            selectedOption={sortOptions[sort]}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        approvedCompaniesReducer: { filters, sort }
    }
}) => ({
    filters,
    sort
});

const mapDispatchToProps = dispatch => ({
    updateApprovedCompaniesFilters: (name, value) => {
        dispatch(updateApprovedCompaniesFilters(name, value));
    },
    updateApprovedCompaniesSort: sort => {
        dispatch(updateApprovedCompaniesSort(sort));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApprovedCompaniesFiltersContainer);
