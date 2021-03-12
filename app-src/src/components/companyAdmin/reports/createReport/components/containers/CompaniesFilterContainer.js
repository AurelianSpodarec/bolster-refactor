import React, { useEffect } from 'react';

import { convertArrToObj } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import CompaniesFilter from '../presentational/CompaniesFilter';
import { usePrevious } from 'helpers/hooks';

const CompaniesFilterContainer = ({
    handleChange,
    postFilters,
    filters: { createdByCompanyID, siteID },
    customFilters: { companies },
    formatArrForDropdown,
    isDrawingPage,
}) => {
    const prevProps = usePrevious({ siteID });

    useEffect(() => {
        if (siteID && !prevProps.siteID && createdByCompanyID) {
            handleChange('createdByCompanyID', null).then(postFilters);
        }
    }, [siteID]);

    useEffect(() => {
        const companiesObj = convertArrToObj(companies);

        if (!companiesObj[createdByCompanyID] && createdByCompanyID) {
            handleChange('createdByCompanyID', null).then(postFilters);
        }
    }, [companies]);

    if (!siteID || companies.length < 2) return null;

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
