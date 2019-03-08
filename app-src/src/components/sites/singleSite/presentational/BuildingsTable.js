import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';
import BuildingsList from './BuildingsList';

const BuildingsTable = ({ buildings, headers, isFetching, error }) => {
    return (
        <Block>
            <Table
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!buildings.length}
                noDataMessage="There are no buildings to display."
            >
                <BuildingsList buildings={buildings} />
            </Table>
        </Block>
    );
};

export default BuildingsTable;
