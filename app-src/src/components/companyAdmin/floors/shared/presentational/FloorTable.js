import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import FloorList from './FloorList';

const FloorTable = ({ floors, headers, isFetching, error }) => {
    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!floors.length}
            noDataMessage="There are no floors to display."
        >
            <FloorList colCount={headers.length} floors={floors} />
        </Table>
    );
};

export default FloorTable;
