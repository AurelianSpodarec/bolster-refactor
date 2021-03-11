import React, { useEffect } from 'react';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import { convertArrToObj } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import CompaniesFilter from '../presentational/CompaniesFilter';

const CompaniesFilterContainer = ({
    handleChange,
    postFilters,
    filters: { hierarchyType, createdByCompanyID, siteID },
    customFilters: { companies },
    formatArrForDropdown,
}) => {
    useEffect(() => {
        if (!siteID) {
            handleChange('createdByCompanyID', null).then(postFilters);
        }
    }, [siteID]);

    useEffect(() => {
        const companiesObj = convertArrToObj(companies);

        if (!companiesObj[createdByCompanyID]) {
            handleChange('createdByCompanyID', null).then(postFilters);
        }
    }, [companies]);

    if (hierarchyType === HIERARCHY_IDS.ALL_SITES) return null;

    return (
        <CompaniesFilter
            handleFormChange={handleFormChange}
            companies={formatArrForDropdown(companies)}
            createdByCompanyID={createdByCompanyID}
        />
    );

    function handleFormChange(name, val) {
        handleChange(name, val).then(postFilters);
    }
};

export default withUpdateOnChange(CompaniesFilterContainer);
