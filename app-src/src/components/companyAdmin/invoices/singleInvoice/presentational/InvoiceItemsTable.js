import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import InvoiceItemsList from './InvoiceItemsList';
import InvoiceItemsTotals from './InvoiceItemsTotals';

const InvoiceItemsTable = ({
    invoiceItems,
    invoice,
    headers,
    isFetching,
    error
}) => (
    <Table
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!invoiceItems.length || !invoice.id}
        noDataMessage="No items to display"
    >
        <InvoiceItemsList
            colCount={headers.length}
            invoiceItems={invoiceItems}
        />
        <InvoiceItemsTotals invoice={invoice} />
    </Table>
);

export default InvoiceItemsTable;
