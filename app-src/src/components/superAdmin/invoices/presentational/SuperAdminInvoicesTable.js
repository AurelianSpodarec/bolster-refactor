import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import SuperAdminInvoicesList from './SuperAdminInvoicesList';

const SuperAdminInvoicesTable = ({
    error,
    isFetching,
    invoices,
    showModal,
    headers
}) => (
    <Table
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!invoices.length}
        noDataMessage="No invoices to display"
    >
        <SuperAdminInvoicesList invoices={invoices} showModal={showModal} />
    </Table>
);

export default SuperAdminInvoicesTable;
