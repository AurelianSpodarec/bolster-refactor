import React, { useEffect } from 'react';

import { convertArrToObj } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import CompaniesFilter from '../presentational/CompaniesFilter';
import { usePrevious } from 'helpers/hooks';
import { isEmpty } from 'helpers/generic';

const CompaniesFilterContainer = ({
    handleChange,
    postFilters,
    filters: { createdByCompanyID, siteID },
    customFilters: { companies },
    formatArrForDropdown,
    isDrawingPage,
    sitesObj,
    companyID,
}) => {
    const prevProps = usePrevious({ siteID });
    let companiesSelection = companies;

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

    // don't show if no site selected or sites / companies lists are empty
    if (isEmpty(siteID) || isEmpty(sitesObj) || isEmpty(companies)) return null;
    // filter out all companies except your own if you don't own the selected site
    else if (siteID.length > 1) {
        for (let i = 0; i < siteID.length; i++) {
            if (companyID !== sitesObj[siteID[i]].ownerCompanyID) {
                companiesSelection = companies.filter(company => company.id === companyID);
            }
        }
    } else {
        if (companyID !== sitesObj[siteID[0]].ownerCompanyID) {
            companiesSelection = companies.filter(company => company.id === companyID);
        }
    }

    return (
        <CompaniesFilter
            handleFormChange={handleFormChange}
            companies={formatArrForDropdown(companiesSelection)}
            createdByCompanyID={createdByCompanyID}
            isDrawingPage={isDrawingPage}
        />
    );

    function handleFormChange(name, val) {
        handleChange(name, val).then(postFilters);
    }
};

export default withUpdateOnChange(CompaniesFilterContainer);
