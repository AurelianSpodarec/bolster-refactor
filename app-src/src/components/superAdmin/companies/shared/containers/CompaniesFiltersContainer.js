import React from 'react';

import updateCompaniesFilters from 'actions/superAdmin/companies/sync/updateCompaniesFilters';

import { connect } from 'react-redux';

import CompaniesFilters from '../presentational/CompaniesFilters';

// TODO: add filters

const CompaniesFiltersContainer = ({ filters: { name }, dispatch }) => {
    const handleChange = (name, value) => {
        dispatch(updateCompaniesFilters(name, value));
    };

    return <CompaniesFilters handleChange={handleChange} name={name} />;
};

export default connect(({ superAdmin: { companiesReducer } }) => ({
    filters: companiesReducer.filters
}))(CompaniesFiltersContainer);
