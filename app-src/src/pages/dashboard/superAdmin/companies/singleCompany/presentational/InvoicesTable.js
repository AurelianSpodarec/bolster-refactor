import React from 'react';
import InvoicesList from './InvoicesList';
import Table from 'components/shared/generic/tables/presentational/Table';

const InvoicesTable = ({ headers, isFetching, invoices, error }) => {
    return (
        <Table
            withActions
            isFetching={isFetching}
            error={error}
            noData={!invoices.length}
            noDataMessage="No invoices to display."
            headers={headers}
        >
            <InvoicesList invoices={invoices} />
        </Table>
    );
};

export default InvoicesTable;
