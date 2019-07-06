import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import DemoRequestsList from '../presentational/DemoRequestsList';

const DemoRequestsTable = ({ headers, isFetching, error, demoRequests }) => (
    <Table
        withActions
        headers={headers}
        error={error}
        noData={!demoRequests.length}
        isFetching={isFetching}
        noDataMessage="No demo requests to display"
    >
        <DemoRequestsList
            colCount={headers.length}
            demoRequests={demoRequests}
        />
    </Table>
);

export default DemoRequestsTable;
