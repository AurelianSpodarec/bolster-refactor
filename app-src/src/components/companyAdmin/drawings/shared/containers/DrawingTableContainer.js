import React from 'react';
import { connect } from 'react-redux';

import DrawingTable from '../presentational/DrawingTable';
import { hierarchySort } from 'helpers/generic';

const DrawingTableContainer = ({ isFetching, error, drawings, colSpanFirst = false }) => (
    <DrawingTable
        headers={['Drawing name', 'Created on', 'Last updated', 'Expires', 'Permissions', 'Action']}
        isFetching={isFetching}
        error={error}
        drawings={drawings}
        colSpanFirst={colSpanFirst}
    />
);

export default connect(({ companyAdmin: { drawingsReducer } }, ownProps) => ({
    isFetching: drawingsReducer.isFetching,
    error: drawingsReducer.error,
    drawings: ownProps.ids
        .map(id => drawingsReducer.drawings[id])
        .filter(item => item)
        .sort(hierarchySort),
}))(DrawingTableContainer);
