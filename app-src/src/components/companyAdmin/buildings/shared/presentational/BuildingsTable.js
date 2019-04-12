import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BuildingsList from 'components/companyAdmin/buildings/shared/presentational/BuildingsList';

const BuildingsTable = ({ buildings, headers, isFetching, error }) => {
    return (
        <>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!buildings.length}
                noDataMessage="No buildings to display"
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
