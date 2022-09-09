import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import InvoicePaymentsList from './InvoicePaymentsList';

const InvoicePaymentsTable = ({
    invoicePayments,
    headers,
    isFetching,
    error,
    handleShowModal,
    companies,
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!invoicePayments.length || !companies.length}
        noDataMessage="No items to display"
    >
        <InvoicePaymentsList
            colCount={headers.length}
            invoicePayments={invoicePayments}
            handleShowModal={handleShowModal}
        />
    </Table>
);

export default InvoicePaymentsTable;
