import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import SuperAdminInvoicesTable from '../presentational/SuperAdminInvoicesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { INVOICE_STATUS_TYPES, HAS_PAID_QUERIES } from 'constants/companyAdmin/enums';
import fetchInvoicesBySearch from 'actions/superAdmin/invoices/async/fetchInvoicesBySearch';
import updateInvoiceFilter from 'actions/superAdmin/invoices/sync/updateInvoiceFilter';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';

const SuperAdminInvoicesTableContainer = ({
    error,
    isFetching,
    invoices,
    companies,
    filters,
    fetchInvoicesBySearch,
    count,
    updateInvoiceFilter,
}) => {
    const PAGE_SIZE = 50;
    const { searchTerm, hasPayed, page } = filters;
    const pageCount = Math.ceil(count / PAGE_SIZE);

    return (
        <BlockContainer>
            <BlockHeading title="All Invoices">
                <PageSelector page={page} maxPage={pageCount} setPage={setPage} />
            </BlockHeading>
            <SuperAdminInvoicesTable
                headers={[
                    'Date',
                    'Company Name',
                    'Order ID',
                    'Sub Total (Ex Vat)',
                    'Type',
                    'Status',
                    '',
                ]}
                error={error}
                isFetching={isFetching}
                invoices={_filteredInvoices()}
                companies={companies}
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
                    orderIDFilter.includes(invoice.id.toString()),
            )
            .sort((a, b) => moment(b.createdOn) - moment(a.createdOn));
    }

    function setPage(nextPage) {
        const hasPaidQuery = HAS_PAID_QUERIES[hasPayed];
        fetchInvoicesBySearch(nextPage, searchTerm, hasPaidQuery, PAGE_SIZE);
        updateInvoiceFilter('page', nextPage);
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

const mapDispatchToProps = { fetchInvoicesBySearch, updateInvoiceFilter };

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminInvoicesTableContainer);
