import React from 'react';
import { connect } from 'react-redux';

import CompaniesFilters from '../presentational/CompaniesFilters';

import updateCompaniesFilters from 'actions/superAdmin/companies/sync/updateCompaniesFilters';
import { COMPANY_TYPES } from 'constants/companyAdmin/enums';
import { enumFormatCapitalKeys } from 'helpers/generic';

const CompaniesFiltersContainer = ({
    filters: { name, companyType },
    updateCompaniesFilters
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
        updateCompaniesFilters(name, value);
    }
};

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { filters }
    }
}) => ({ filters });

const mapDispatchToProps = { updateCompaniesFilters };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompaniesFiltersContainer);
