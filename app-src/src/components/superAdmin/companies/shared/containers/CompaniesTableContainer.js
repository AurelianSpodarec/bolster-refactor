import React from 'react';
import { connect } from 'react-redux';
import CompaniesTable from '../presentational/CompaniesTable';

import { COMPANY_TYPES } from 'constants/companyAdmin/enums';
const { ALL } = COMPANY_TYPES;

const CompaniesTableContainer = ({
    isFetching,
    fetchingError,
    companies,
    filters
}) => {
    return (
        <CompaniesTable
            headers={[
                'Company',
                'Telephone',
                'Address',
                'Terms Accepted On',
                'Type',
                ''
            ]}
            isFetching={isFetching}
            error={fetchingError}
            companies={_getFilteredCompanies()}
        />
    );

    function _getFilteredCompanies() {
        const name = filters.name.toLowerCase();
        const { companyType } = filters;
        return companies.filter(
            company =>
                // filter by name
                (company.name.toLowerCase().includes(name) ||
                    company.code.includes(+name)) &&
                // filter by type
                (companyType === ALL || companyType === company.companyType)
        );
    }
};

export default connect(({ superAdmin: { companiesReducer } }) => ({
    isFetching: companiesReducer.isFetching,
    fetchingError: companiesReducer.fetchingError,
    companies: Object.values(companiesReducer.companies),
    filters: companiesReducer.filters
}))(CompaniesTableContainer);
