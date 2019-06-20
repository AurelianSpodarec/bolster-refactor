import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import SuperAdminInvoicesList from './SuperAdminInvoicesList';

const SuperAdminInvoicesTable = ({
    error,
    isFetching,
    invoices,
    showModal,
    headers,
    companies
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!invoices.length || !Object.values(companies).length}
        noDataMessage="No invoices to display."
    >
        <SuperAdminInvoicesList
            invoices={invoices}
            showModal={showModal}
            companies={companies}
        />
    </Table>
);

export default SuperAdminInvoicesTable;
