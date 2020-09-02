import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingList from './DrawingList';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const DrawingTable = ({ drawings, headers, isFetching, error, isOver, forwardRef, colSpanFirst = false }) => {
    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!drawings.length}
            noDataMessage="No drawings to display"
            withoutTBody
            extraClasses={isOver ? 'dragging' : ''}
            colSpanFirst={colSpanFirst}
        >
            <DrawingList
                isOver={isOver}
                forwardRef={forwardRef}
                colCount={headers.length}
                drawings={drawings}
                headers={headers}
                colSpanFirst={colSpanFirst}
            />
        </Table>
    );
};

export default withDropZone(DrawingTable, 'DRAWING');
