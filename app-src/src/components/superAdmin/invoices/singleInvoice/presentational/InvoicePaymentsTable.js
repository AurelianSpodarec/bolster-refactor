import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import InvoicePaymentsList from './InvoicePaymentsList';

const InvoicePaymentsTable = ({
    payments,
    headers,
    isFetching,
    error,
    handleShowModal
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!payments.length}
        noDataMessage="No items to display"
    >
        <InvoicePaymentsList
            colCount={headers.length}
            payments={payments}
            handleShowModal={handleShowModal}
        />
    </Table>
);

export default InvoicePaymentsTable;
