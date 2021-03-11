import React from 'react';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import CompaniesFilter from '../presentational/CompaniesFilter';

const CompaniesFilterContainer = ({
    handleChange,
    postFilters,
    filters: { hierarchyType, createdByCompanyID },
    customFilters: { companies },
}) => {
    if (hierarchyType === HIERARCHY_IDS.ALL_SITES) return null;

    return (
        <CompaniesFilter
            handleFormChange={handleFormChange}
            companies={companies}
            createdByCompanyID={createdByCompanyID}
        />
    );

    function handleFormChange(name, val) {
        return handleChange(name, val).then(postFilters);
    }
};

export default withUpdateOnChange(CompaniesFilterContainer);
