import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import InvoicesList from './InvoicesList';

const InvoicesTable = ({ invoices, headers, isFetching, error, showModal }) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!invoices.length}
        noDataMessage="No invoices to display."
    >
        <InvoicesList invoices={invoices} showModal={showModal} />
    </Table>
);

export default InvoicesTable;
