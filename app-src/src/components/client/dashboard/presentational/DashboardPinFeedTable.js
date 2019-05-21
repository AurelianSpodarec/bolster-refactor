import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import DashboardPinFeedList from './DashboardPinFeedList';

const DashboardPinFeedTable = ({ pins, isFetching, error, headers }) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!pins.length}
        noDataMessage="No pins to display"
    >
        <DashboardPinFeedList pins={pins} />
    </Table>
);

export default DashboardPinFeedTable;
