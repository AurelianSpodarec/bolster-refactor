import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';

import fetchCompanies from 'actions/companies/async/fetchCompanies';

class DrawingCompanyAccessContainer extends Component {
    render() {
        const { props } = this;

        return (
            <CompaniesAccessTable
                companies={props.companies}
                isFetching={props.isFetching}
                error={props.error}
            />
        );
    }
}

const mapStateToProps = ({ companiesReducer }) => ({
    companies: Object.values(companiesReducer.companies),
    isFetching: companiesReducer.isFetching,
    error: companiesReducer.error
});

export default connect(mapStateToProps)(DrawingCompanyAccessContainer);
