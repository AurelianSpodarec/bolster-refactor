import React from 'react';
import { connect } from 'react-redux';

import FloorTable from '../presentational/FloorTable';
import { hierarchySort } from 'helpers/generic';

const FloorTableContainer = ({ isFetching, error, floors, colSpanFirst = false, isSorting }) => {
    return (
        <FloorTable
            headers={['Floor name', 'Created on', 'Permissions', 'Action']}
            isFetching={isFetching}
            error={error}
            floors={floors}
            colSpanFirst={colSpanFirst}
            isSorting={isSorting}
        />
    );
};

export default connect(({ companyAdmin: { floorsReducer, hierarchyReducer } }, ownProps) => ({
    isFetching: floorsReducer.isFetching,
    error: floorsReducer.error,
    floors: ownProps.ids
        .map(id => floorsReducer.floors[id])
        .filter(item => item)
        .sort(hierarchySort),
    isSorting: hierarchyReducer.isSorting,
}))(FloorTableContainer);
