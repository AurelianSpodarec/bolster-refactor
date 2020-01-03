import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SuperAdminInvoicesTable from '../presentational/SuperAdminInvoicesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { INVOICE_STATUS_TYPES } from 'constants/companyAdmin/enums';
import fetchInvoicesByPage from 'actions/superAdmin/invoices/async/fetchInvoicesByPage';
import resetInvoices from 'actions/superAdmin/invoices/sync/resetInvoices';
import { useThrottle } from 'helpers/hooks';

const SuperAdminInvoicesTableContainer = ({
    error,
    isFetching,
    invoices,
    companies,
    filters,
    fetchInvoicesByPage,
    resetInvoices,
}) => {
    const [page, setPage] = useState(1);
    const { searchTerm } = filters;

    useThrottle(handleSearch, 500, [searchTerm]);

    return (
        <BlockContainer>
            <BlockHeading title="All Invoices" />
            <SuperAdminInvoicesTable
                headers={['Date', 'Company Name', 'Order ID', 'Total', 'Type', 'Status', '']}
                error={error}
                isFetching={isFetching}
                invoices={_filteredInvoices()}
                companies={companies}
                fetchNextPage={fetchNextPage}
            />
        </BlockContainer>
    );

    function _filteredInvoices() {
        const { searchTerm, hasPayed } = filters;
        const term = searchTerm.toLowerCase();
        const companyNameFilter = Object.values(companies)
            .filter(({ name }) => name.toLowerCase().includes(term))
            .map(({ id }) => id);

        const orderIDFilter = invoices
            .filter(invoice => invoice.id.toString().includes(term))
            .map(filteredInvoice => filteredInvoice.id.toString());

        const filteredInvoices = invoices.filter(invoice => {
            switch (+hasPayed) {
                case INVOICE_STATUS_TYPES.ALL:
                    return true;
                case INVOICE_STATUS_TYPES.PAID:
                    return invoice.isPaid;
                case INVOICE_STATUS_TYPES.UNPAID:
                    return !invoice.isPaid;
                default:
                    return true;
            }
        });

        return filteredInvoices
            .filter(
                invoice =>
                    companyNameFilter.includes(invoice.companyID) ||
                    orderIDFilter.includes(invoice.id.toString())
            )
            .sort((a, b) => moment(b.createdOn) - moment(a.createdOn));
    }

    function fetchNextPage() {
        fetchInvoicesByPage(page + 1, searchTerm);
        setPage(page + 1);
    }
    function handleSearch() {
        resetInvoices();
        setPage(1);
        fetchInvoicesByPage(1, searchTerm);
    }
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { error, isFetching, invoices, filters },
        companiesReducer: { isFetching: isFetchingCompanies, error: companiesError, companies },
    },
}) => ({
    companies: companies || {},
    invoices: Object.values(invoices),
    error: error || companiesError,
    filters,
    isFetching: isFetching || isFetchingCompanies,
});

const mapDispatchToProps = { fetchInvoicesByPage, resetInvoices };

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminInvoicesTableContainer);
