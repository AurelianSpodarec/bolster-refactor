import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BuildingsList from 'components/companyAdmin/buildings/shared/presentational/BuildingsList';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const BuildingsTable = ({ items, headers, isFetching, error, forwardRef, isOver }) => {
    return (
        <>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!items.length}
                noDataMessage="There are no buildings to display."
                withoutTBody
                extraClasses={isOver ? 'dragging' : ''}
            >
                <BuildingsList
                    colCount={headers.length}
                    buildings={items}
                    headers={headers}
                    forwardRef={forwardRef}
                    isOver={isOver}
                />
            </Table>
        </>
    );
};

export default withDropZone(BuildingsTable, 'BUILDING');
