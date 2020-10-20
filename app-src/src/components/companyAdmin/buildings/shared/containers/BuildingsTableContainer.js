import React from 'react';
import { connect } from 'react-redux';

import BuildingsTable from '../presentational/BuildingsTable';
import { hierarchySort } from 'helpers/generic';

const BuildingsTableContainer = ({
    isFetching,
    error,
    buildings,
    colSpanFirst = false,
    isSorting,
}) => {
    return (
        <BuildingsTable
            headers={['Building name', 'Created on', 'Permissions', 'Action']}
            isFetching={isFetching}
            error={error}
            items={buildings}
            colSpanFirst={colSpanFirst}
            isSorting={isSorting}
        />
    );
};

export default connect(({ companyAdmin: { buildingsReducer, hierarchyReducer } }, ownProps) => ({
    isFetching: buildingsReducer.isFetching,
    error: buildingsReducer.error,
    buildings: ownProps.ids
        .map(id => buildingsReducer.buildings[id])
        .filter(item => item)
        .sort(hierarchySort),
    isSorting: hierarchyReducer.isSorting,
}))(BuildingsTableContainer);
