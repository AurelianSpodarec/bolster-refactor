import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';

import DashboardDataByOperativeListItem from './DashboardDataByOperativeListItem';

const DashboardDataByOperativeTable = ({
    headers,
    isFetching,
    error,
    operatives
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!operatives.length}
        noDataMessage="There are no operatives to display."
    >
        {operatives.map(operative => (
            <DashboardDataByOperativeListItem
                key={operative.id}
                operative={operative}
            />
        ))}
    </Table>
);

export default DashboardDataByOperativeTable;
