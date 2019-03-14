import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BuildingsList from 'components/buildings/shared/presentational/BuildingsList';

const BuildingsTable = ({ buildings, headers, isFetching, error }) => {
    return (
        <>
            <h3 className="heading heading-3 table-heading">Buildings</h3>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!buildings.length}
                noDataMessage="There are no buildings to display."
            >
                <BuildingsList
                    colCount={headers.length}
                    buildings={buildings}
                />
            </Table>
        </>
    );
};

export default BuildingsTable;
