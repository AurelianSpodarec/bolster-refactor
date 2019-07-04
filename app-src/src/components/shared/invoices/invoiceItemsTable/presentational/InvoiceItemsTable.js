import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import InvoiceItemsList from './InvoiceItemsList';
import InvoiceItemsTotals from './InvoiceItemsTotals';

const InvoiceItemsTable = ({
    invoiceItems,
    invoice,
    headers,
    isFetching,
    error,
    onMobile
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!invoiceItems.length || !invoice.id}
        noDataMessage="No items to display"
    >
        <InvoiceItemsList
            colCount={headers.length}
            invoiceItems={invoiceItems}
            headers={headers}
            onMobile={onMobile}
        />
        <InvoiceItemsTotals invoice={invoice} onMobile={onMobile} />
    </Table>
);

export default InvoiceItemsTable;
