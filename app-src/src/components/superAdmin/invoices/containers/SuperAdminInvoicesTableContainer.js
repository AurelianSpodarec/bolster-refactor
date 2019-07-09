import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchAllInvoices from 'actions/superAdmin/invoices/async/fetchAllInvoices';
import SuperAdminInvoicesTable from '../presentational/SuperAdminInvoicesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SuperAdminInvoicesTableContainer = ({
    error,
    isFetching,
    invoices,
    companies,
    filters
}) => {
    function _filteredInvoices() {
        const { searchTerm, hasPayed } = filters;
        const companyNameFilter = Object.values(companies)
            .filter(company =>
                company.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(filteredCompany => filteredCompany.id);

        const orderIDFilter = invoices
            .filter(invoice =>
                invoice.id.toString().includes(searchTerm.toLowerCase())
            )
            .map(filteredInvoice => filteredInvoice.id.toString());

        const hasPayedInvoices = invoices
            .filter(invoice => invoice.isPaid === true)
            .sort((a, b) => moment(b.createdOn) - moment(a.createdOn));
        const hasNotPayedInvoices = invoices
            .filter(invoice => invoice.isPaid === false)
            .sort((a, b) => moment(b.createdOn) - moment(a.createdOn));

        if (hasPayed === '1') {
            return hasPayedInvoices.filter(
                invoice =>
                    companyNameFilter.includes(invoice.companyID) ||
                    orderIDFilter.includes(invoice.id.toString())
            );
        } else if (hasPayed === '2') {
            return hasNotPayedInvoices.filter(
                invoice =>
                    companyNameFilter.includes(invoice.companyID) ||
                    orderIDFilter.includes(invoice.id.toString())
            );
        } else {
            return invoices
                .filter(
                    invoice =>
                        companyNameFilter.includes(invoice.companyID) ||
                        orderIDFilter.includes(invoice.id.toString())
                )
                .sort((a, b) => moment(b.createdOn) - moment(a.createdOn));
        }
    }

    return (
        <BlockContainer>
            <BlockHeading title="All Invoices" />
            <SuperAdminInvoicesTable
                headers={[
                    'Date',
                    'Company Name',
                    'Order ID',
                    'Total',
                    'Type',
                    'Status',
                    ''
                ]}
                error={error}
                isFetching={isFetching}
                invoices={_filteredInvoices()}
                companies={companies}
            />
        </BlockContainer>
    );
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { error, isFetching, invoices, filters },
        companiesReducer: {
            isFetching: isFetchingCompanies,
            error: companiesError,
            companies
        }
    }
}) => ({
    companies: companies || {},
    invoices: Object.values(invoices),
    error: error || companiesError,
    filters,
    isFetching: isFetching || isFetchingCompanies
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    fetchAllInvoices: () => dispatch(fetchAllInvoices())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuperAdminInvoicesTableContainer);
