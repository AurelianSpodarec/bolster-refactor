import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import TransferRequestsList from './TransferRequestsList';

const TransferRequestsTable = ({
    headers,
    isFetching,
    error,
    incomingTransferRequests,
    outgoingTransferRequests
}) => (
    <Table
        headers={headers}
        isFetching={isFetching}
        noData={
            !incomingTransferRequests.length && !outgoingTransferRequests.length
        }
        noDataMessage="There are no pending owner requests to display."
        error={error}
        withActions={true}
    >
        {!!incomingTransferRequests.length && (
            <TransferRequestsList requests={incomingTransferRequests} />
        )}
        {!!outgoingTransferRequests.length && (
            <TransferRequestsList requests={outgoingTransferRequests} />
        )}
    </Table>
);

export default TransferRequestsTable;
