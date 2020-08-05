import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BuildingsList from 'components/companyAdmin/buildings/shared/presentational/BuildingsList';

const BuildingsTable = ({ buildings, headers, isFetching, error, colSpanFirst = false }) => {
    return (
        <>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!buildings.length}
                noDataMessage="There are no buildings to display."
                withoutTBody
            >
                <BuildingsList
                    colCount={headers.length}
                    buildings={buildings}
                    headers={headers}
                    colSpanFirst={colSpanFirst}
                />
            </Table>
        </>
    );
};

export default BuildingsTable;
