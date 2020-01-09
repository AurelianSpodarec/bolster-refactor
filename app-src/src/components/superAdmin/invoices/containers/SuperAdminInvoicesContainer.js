import React, { Component } from 'react';
import { connect } from 'react-redux';

import SuperAdminInvoices from '../presentational/SuperAdminInvoices';
import fetchAllInvoices from 'actions/superAdmin/invoices/async/fetchAllInvoices';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import fetchInvoicesBySearch from 'actions/superAdmin/invoices/async/fetchInvoicesBySearch';

class SuperAdminInvoicesContainer extends Component {
    render = () => {
        const { isFetching, error, invoices, companies } = this.props;
        return (
            <SuperAdminInvoices
                isFetching={isFetching}
                error={error}
                invoices={invoices}
                companies={companies}
            />
        );
    };

    componentDidMount = () => {
        const { fetchInvoicesBySearch, fetchAllCompanies } = this.props;
        fetchAllCompanies();
        fetchInvoicesBySearch(1);
    };
}

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { isFetching, error, invoices },
        companiesReducer: { isFetching: isFetchingCompany, error: companiesError, companies },
    },
}) => ({
    isFetching: isFetching || isFetchingCompany,
    error: error || companiesError,
    invoices,
    companies,
});

const mapDispatchToProps = { fetchAllCompanies, fetchAllInvoices, fetchInvoicesBySearch };

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminInvoicesContainer);
