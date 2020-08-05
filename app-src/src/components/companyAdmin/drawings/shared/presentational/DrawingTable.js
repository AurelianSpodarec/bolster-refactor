import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingList from './DrawingList';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const DrawingTable = ({ drawings, headers, isFetching, error, isOver, forwardRef }) => {
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
        >
            <DrawingList
                isOver={isOver}
                forwardRef={forwardRef}
                colCount={headers.length}
                drawings={drawings}
                headers={headers}
            />
        </Table>
    );
};

export default withDropZone(DrawingTable, 'DRAWING');
