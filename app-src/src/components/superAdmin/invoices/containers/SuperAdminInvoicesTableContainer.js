import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SuperAdminInvoicesTable from '../presentational/SuperAdminInvoicesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { INVOICE_STATUS_TYPES, HAS_PAID_QUERIES } from 'constants/companyAdmin/enums';
import fetchInvoicesBySearch from 'actions/superAdmin/invoices/async/fetchInvoicesBySearch';
import resetInvoices from 'actions/superAdmin/invoices/sync/resetInvoices';
import { useThrottle } from 'helpers/hooks';
import { withRouter } from 'react-router-dom';

const SuperAdminInvoicesTableContainer = ({
    error,
    isFetching,
    invoices,
    companies,
    filters,
    fetchInvoicesBySearch,
    resetInvoices,
    count,
}) => {
    const PAGE_SIZE = 50;
    const [page, setPage] = useState(1);
    const { searchTerm, hasPayed } = filters;
    const pageCount = Math.floor(count / PAGE_SIZE);

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
                fetchPrevPage={fetchPrevPage}
                pageCount={pageCount}
                count={count}
                page={page}
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

    function fetchPrevPage() {
        const hasPaidQuery = HAS_PAID_QUERIES[hasPayed];
        fetchInvoicesBySearch(page - 1, searchTerm, hasPaidQuery);
        setPage(page - 1);
    }
    function fetchNextPage() {
        const hasPaidQuery = HAS_PAID_QUERIES[hasPayed];
        fetchInvoicesBySearch(page + 1, searchTerm, hasPaidQuery);
        setPage(page + 1);
    }
    function handleSearch() {
        const hasPaidQuery = HAS_PAID_QUERIES[hasPayed];
        fetchInvoicesBySearch(1, searchTerm, hasPaidQuery);
        resetInvoices();
        setPage(1);
    }
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { error, isFetching, invoices, filters, count },
        companiesReducer: { isFetching: isFetchingCompanies, error: companiesError, companies },
    },
}) => ({
    companies: companies || {},
    invoices: Object.values(invoices),
    count,
    error: error || companiesError,
    filters,
    isFetching: isFetching || isFetchingCompanies,
});

const mapDispatchToProps = { fetchInvoicesBySearch, resetInvoices };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SuperAdminInvoicesTableContainer)
);
