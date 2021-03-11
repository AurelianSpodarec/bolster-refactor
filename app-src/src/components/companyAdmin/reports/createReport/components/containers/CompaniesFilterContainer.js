import React, { useEffect } from 'react';

import { convertArrToObj } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import CompaniesFilter from '../presentational/CompaniesFilter';

const CompaniesFilterContainer = ({
    handleChange,
    postFilters,
    filters: { createdByCompanyID, siteID },
    customFilters: { companies },
    formatArrForDropdown,
    isDrawingPage,
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

    if (!siteID) return null;

    return (
        <CompaniesFilter
            handleFormChange={handleFormChange}
            companies={formatArrForDropdown(companies)}
            createdByCompanyID={createdByCompanyID}
            isDrawingPage={isDrawingPage}
        />
    );

    function handleFormChange(name, val) {
        handleChange(name, val).then(postFilters);
    }
};

export default withUpdateOnChange(CompaniesFilterContainer);
