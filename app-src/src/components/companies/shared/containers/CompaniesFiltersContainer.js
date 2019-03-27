import React from 'react';
// import updateCompaniesFilters from 'actions/users/sync/updateCompaniesFilter';
import { connect } from 'react-redux';
import CompaniesFilters from '../presentational/CompaniesFilters';

// TODO: add filters

const CompaniesFiltersContainer = ({ filters, dispatch }) => {
    const handleChange = e => {
        e.preventDefault();
        // dispatch(updateCompaniesFilters(e.target.name, e.target.value));
    };

    return <CompaniesFilters handleChange={handleChange} />;
};

export default connect(({ companiesReducer }) => ({
    filters: companiesReducer.filters
}))(CompaniesFiltersContainer);
