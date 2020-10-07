import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingList from './DrawingList';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const DrawingTable = ({
    drawings,
    headers,
    isFetching,
    error,
    isOver,
    forwardRef,
    colSpanFirst = false,
    isSorting,
}) => {
    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!drawings.length}
            noDataMessage="No drawings to display"
            withoutTBody
            extraClasses={isSorting ? 'sorting' : ''}
            colSpanFirst={colSpanFirst}
        >
            <DrawingList
                isOver={isOver}
                forwardRef={forwardRef}
                colCount={headers.length}
                drawings={drawings}
                headers={headers}
                colSpanFirst={colSpanFirst}
                isSorting={isSorting}
            />
        </Table>
    );
};

export default withDropZone(DrawingTable, 'DRAWING');
