import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import FloorList from './FloorList';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const FloorTable = ({ floors, headers, isFetching, error, isOver, forwardRef }) => {
    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!floors.length}
            noDataMessage="No floors to display"
            withoutTBody
            extraClasses={isOver ? 'dragging' : ''}
        >
            <FloorList
                colCount={headers.length}
                floors={floors}
                headers={headers}
                isOver={isOver}
                forwardRef={forwardRef}
            />
        </Table>
    );
};

export default withDropZone(FloorTable, 'FLOOR');
