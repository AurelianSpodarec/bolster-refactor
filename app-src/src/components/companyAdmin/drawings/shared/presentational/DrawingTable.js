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
            withoutTBody
        >
            <DrawingList
                colCount={headers.length}
                drawings={drawings}
                headers={headers}
            />
        </Table>
    );
};

export default DrawingTable;
