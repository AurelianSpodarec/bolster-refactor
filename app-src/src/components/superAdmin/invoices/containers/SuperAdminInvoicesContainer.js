import React, { Component } from 'react';
import { connect } from 'react-redux';

import SuperAdminInvoices from '../presentational/SuperAdminInvoices';
import fetchAllInvoices from 'actions/superAdmin/invoices/async/fetchAllInvoices';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import fetchInvoicesByPage from 'actions/superAdmin/invoices/async/fetchInvoicesByPage';

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
        const { fetchInvoicesByPage, fetchAllCompanies } = this.props;
        fetchAllCompanies();
        fetchInvoicesByPage(1);
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

const mapDispatchToProps = { fetchAllCompanies, fetchAllInvoices, fetchInvoicesByPage };

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminInvoicesContainer);
