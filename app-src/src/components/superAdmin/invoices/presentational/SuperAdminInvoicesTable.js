import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import SuperAdminInvoicesList from './SuperAdminInvoicesList';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const SuperAdminInvoicesTable = ({
    error,
    isFetching,
    invoices,
    showModal,
    headers,
    companies,
    fetchNextPage,
    page,
    count,
    pageCount,
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!invoices.length || !Object.values(companies).length}
        noDataMessage="No invoices to display."
    >
        <SuperAdminInvoicesList invoices={invoices} showModal={showModal} companies={companies} />
        {page > 1 && <ButtonContainer>Previous</ButtonContainer>}
        <p>
            page {page} of {pageCount}
        </p>
        {page < pageCount && (
            <ButtonContainer handleClick={fetchNextPage}>Next Page</ButtonContainer>
        )}
    </Table>
);

export default SuperAdminInvoicesTable;
