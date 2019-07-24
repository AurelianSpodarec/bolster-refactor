import React from 'react';

import updateCompaniesFilters from 'actions/superAdmin/companies/sync/updateCompaniesFilters';

import { connect } from 'react-redux';

import CompaniesFilters from '../presentational/CompaniesFilters';
import { COMPANY_TYPES } from 'constants/companyAdmin/enums';
import { enumFormatCapitalKeys } from 'helpers/generic';

// TODO: add filters

const CompaniesFiltersContainer = ({
    filters: { name, companyType },
    dispatch
}) => {
    const companyTypeOptions = enumFormatCapitalKeys(COMPANY_TYPES);
    return (
        <CompaniesFilters
            handleChange={handleChange}
            name={name}
            companyType={companyType}
            companyTypeOptions={companyTypeOptions}
        />
    );
    function handleChange(name, value) {
        dispatch(updateCompaniesFilters(name, value));
    }
};

export default connect(({ superAdmin: { companiesReducer: { filters } } }) => ({
    filters
}))(CompaniesFiltersContainer);
