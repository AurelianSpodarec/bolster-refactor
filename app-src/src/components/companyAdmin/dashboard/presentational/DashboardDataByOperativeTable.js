import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';

import DashboardDataByOperativeListItem from './DashboardDataByOperativeListItem';

const DashboardDataByOperativeTable = ({
    headers,
    isFetching,
    error,
    operatives,
    onMobile
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!operatives.length}
        noDataMessage="There are no operatives to display."
    >
        {operatives.slice(0, 8).map(operative => (
            <DashboardDataByOperativeListItem
                key={operative.id}
                operative={operative}
                onMobile={onMobile}
                headers={headers}
            />
        ))}
    </Table>
);

export default DashboardDataByOperativeTable;
