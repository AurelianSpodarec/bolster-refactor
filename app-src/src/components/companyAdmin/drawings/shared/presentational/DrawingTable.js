import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingList from './DrawingList';

const DrawingTable = ({ drawings, headers, isFetching, error }) => {
    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!drawings.length}
            noDataMessage="No drawings to display"
        >
            <DrawingList colCount={headers.length} drawings={drawings} />
        </Table>
    );
};

export default DrawingTable;
