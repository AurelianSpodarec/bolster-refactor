import React from 'react';
import { connect } from 'react-redux';
import CompaniesTable from '../presentational/CompaniesTable';

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
                ''
            ]}
            isFetching={isFetching}
            error={fetchingError}
            companies={_getFilteredCompanies()}
        />
    );

    function _getFilteredCompanies() {
        const name = filters.name.toLowerCase();
        return companies.filter(company =>
            company.name.toLowerCase().includes(name)
        );
    }
};

export default connect(({ companyAdmin: { companiesReducer } }) => ({
    isFetching: companiesReducer.isFetching,
    fetchingError: companiesReducer.fetchingError,
    companies: Object.values(companiesReducer.companies),
    filters: companiesReducer.filters
}))(CompaniesTableContainer);
