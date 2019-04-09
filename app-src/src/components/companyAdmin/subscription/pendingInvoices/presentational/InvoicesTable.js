import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import InvoicesList from './InvoicesList';

const InvoicesTable = ({ invoices, headers, isFetching, error }) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!invoices.length}
        noDataMessage="No invoices to display"
    >
        <InvoicesList colCount={headers.length} invoices={invoices} />
    </Table>
);

export default InvoicesTable;
