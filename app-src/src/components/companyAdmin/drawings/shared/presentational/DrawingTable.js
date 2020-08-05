import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingList from './DrawingList';

const DrawingTable = ({ drawings, headers, isFetching, error, colSpanFirst = false }) => {
    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!drawings.length}
            noDataMessage="No drawings to display"
            withoutTBody
            colSpanFirst={colSpanFirst}
        >
            <DrawingList
                colCount={headers.length}
                drawings={drawings}
                headers={headers}
                colSpanFirst={colSpanFirst}
            />
        </Table>
    );
};

export default DrawingTable;
