import React from 'react';

import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import FloorList from './FloorList';
import withDropZone from 'components_DEPRECATED/shared/dragDrop/hocs/withDropZone';

const FloorTable = ({
    floors,
    headers,
    isFetching,
    error,
    isOver,
    forwardRef,
    colSpanFirst,
    isSorting,
}) => {
    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!floors.length}
            noDataMessage="No floors to display"
            withoutTBody
            extraClasses={isSorting ? 'sorting' : ''}
        >
            <FloorList
                colCount={headers.length}
                floors={floors}
                headers={headers}
                isOver={isOver}
                forwardRef={forwardRef}
                colSpanFirst={colSpanFirst}
                isSorting={isSorting}
            />
        </Table>
    );
};

export default withDropZone(FloorTable, 'FLOOR');
