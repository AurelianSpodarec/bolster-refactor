import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BuildingsList from './BuildingsList';

const BuildingsTable = ({ buildings, headers, isFetching, error }) => {
    return (
        <>
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
                    headers={headers}
                />
            </Table>
        </>
    );
};

export default BuildingsTable;
