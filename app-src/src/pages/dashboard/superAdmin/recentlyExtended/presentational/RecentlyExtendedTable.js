import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import RecentlyExtendedList from './RecentlyExtendedList';

const RecentlyExtendedTable = ({ recentlyExtended, headers, error, isFetching }) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!recentlyExtended.length}
        noDataMessage="No Recent Extensions (last 30 days) to display"
    >
        <RecentlyExtendedList recentlyExtended={recentlyExtended} />
    </Table>
);

export default RecentlyExtendedTable;
