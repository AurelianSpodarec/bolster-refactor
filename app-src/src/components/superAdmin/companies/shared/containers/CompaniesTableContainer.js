import React from 'react';
import { connect } from 'react-redux';
import CompaniesTable from '../presentational/CompaniesTable';

import { COMPANY_TYPES } from 'constants/companyAdmin/enums';
const { ALL } = COMPANY_TYPES;

const CompaniesTableContainer = ({ isFetching, fetchingError, companies, filters }) => {
    return (
        <CompaniesTable
            headers={[
                'Company',
                'Telephone',
                'Address',
                'Terms Accepted On',
                'Type',
                'Credits',
                'Shows on client list?',
                '',
            ]}
            isFetching={isFetching}
            error={fetchingError}
            companies={_getFilteredCompanies()}
        />
    );

    function _getFilteredCompanies() {
        const name = filters.name.toLowerCase();
        const { companyType, serviceIDs } = filters;
        const shouldFilterServiceIDs = !!serviceIDs.length;
        return companies.filter(company => {
            // filter by name
            const nameMatches =
                company.name.toLowerCase().includes(name) || company.code.includes(+name);
            if (!nameMatches) return false;
            // filter by type
            const typeMatches = companyType === ALL || companyType === company.companyType;
            if (!typeMatches) return false;
            // filter by service
            const serviceMatches =
                !shouldFilterServiceIDs ||
                (company.serviceIDs || []).some(id => serviceIDs.includes(id));
            if (!serviceMatches) return false;
            return true;
        });
    }
};

export default connect(({ superAdmin: { companiesReducer } }) => ({
    isFetching: companiesReducer.isFetching,
    fetchingError: companiesReducer.fetchingError,
    companies: Object.values(companiesReducer.companies),
    filters: companiesReducer.filters,
}))(CompaniesTableContainer);
