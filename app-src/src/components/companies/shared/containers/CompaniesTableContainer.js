import React from 'react';
import { connect } from 'react-redux';
import CompaniesTable from '../presentational/CompaniesTable';

const CompaniesTableContainer = ({ isFetching, fetchingError, companies }) => (
    <CompaniesTable
        headers={['Company', 'Telephone', 'Address', '']}
        isFetching={isFetching}
        error={fetchingError}
        companies={companies}
    />
);

export default connect(({ companiesReducer }) => ({
    isFetching: companiesReducer.isFetching,
    fetchingError: companiesReducer.fetchingError,
    companies: Object.values(companiesReducer.companies)
}))(CompaniesTableContainer);
