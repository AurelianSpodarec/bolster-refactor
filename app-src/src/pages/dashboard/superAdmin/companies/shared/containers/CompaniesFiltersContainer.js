import React from 'react';
import { connect } from 'react-redux';

import CompaniesFilters from '../presentational/CompaniesFilters';

import updateCompaniesFilters from 'actions/superAdmin/companies/sync/updateCompaniesFilters';
import { COMPANY_TYPES } from 'constants/companyAdmin/enums';
import { enumFormatCapitalKeys } from 'helpers/generic';

const CompaniesFiltersContainer = ({
    filters: { name, companyType, serviceIDs },
    updateCompaniesFilters,
    services,
}) => {
    const companyTypeOptions = enumFormatCapitalKeys(COMPANY_TYPES);
    const serviceOptions = Object.values(services).map(service => ({
        value: service.id,
        label: service.name,
    }));
    return (
        <CompaniesFilters
            handleChange={handleChange}
            name={name}
            companyType={companyType}
            companyTypeOptions={companyTypeOptions}
            serviceOptions={serviceOptions}
            serviceIDs={serviceIDs}
        />
    );
    function handleChange(name, value) {
        updateCompaniesFilters(name, value);
    }
};

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { filters },
        adminServicesReducer: { adminServices },
    },
}) => ({ filters, services: adminServices });

const mapDispatchToProps = { updateCompaniesFilters };

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesFiltersContainer);
