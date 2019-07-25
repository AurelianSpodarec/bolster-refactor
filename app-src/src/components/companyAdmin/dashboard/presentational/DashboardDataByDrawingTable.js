import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';

import DashboardDataByDrawingListItem from './DashboardDataByDrawingListItem';

const DashboardDataByDrawingTable = ({
    headers,
    isFetching,
    error,
    drawings
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!drawings.length}
        noDataMessage="There are no drawings to display."
    >
        {drawings.map(drawing => (
            <DashboardDataByDrawingListItem
                key={drawing.id}
                drawing={drawing}
            />
        ))}
    </Table>
);

export default DashboardDataByDrawingTable;
