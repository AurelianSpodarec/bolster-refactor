import React from 'react';

import updateApprovedCompaniesFilters from 'actions/companyAdmin/approvedCompanies/sync/updateApprovedCompaniesFilters';

import { connect } from 'react-redux';

import ApprovedCompaniesFilters from '../presentational/ApprovedCompaniesFilters';
import updateApprovedCompaniesSort from 'actions/companyAdmin/approvedCompanies/sync/updateApprovedCompaniesSort';

// TODO: add filters

const ApprovedCompaniesFiltersContainer = ({
    filters: { name, serviceIDs },
    sort,
    updateApprovedCompaniesFilters,
    updateApprovedCompaniesSort,
    services
}) => {
    const handleChange = (name, value) => {
        updateApprovedCompaniesFilters(name, value);
    };

    const handleSortChange = (_, value) => {
        updateApprovedCompaniesSort(value);
    };

    const sortOptions = [
        { label: 'A - Z', value: 'A - Z' },
        { label: 'Z - A', value: 'Z - A' }
    ];

    const serviceOpts = services.map(({ id, name }) => ({
        value: id,
        label: name
    }));

    return (
        <ApprovedCompaniesFilters
            handleChange={handleChange}
            handleSortChange={handleSortChange}
            name={name}
            sortOptions={sortOptions}
            selectedOption={sort}
            serviceOptions={serviceOpts}
            serviceIDs={serviceIDs}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        approvedCompaniesReducer: { filters, sort },
        servicesReducer: { services }
    }
}) => ({
    filters,
    sort,
    services: Object.values(services)
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
