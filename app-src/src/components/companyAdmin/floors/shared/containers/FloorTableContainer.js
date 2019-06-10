import React from 'react';
import { connect } from 'react-redux';

import FloorTable from '../presentational/FloorTable';
import { hierarchySort } from 'helpers/generic';

const FloorTableContainer = ({ isFetching, error, floors }) => {
    return (
        <FloorTable
            headers={['Floor name', 'Permissions', 'Action']}
            isFetching={isFetching}
            error={error}
            floors={floors}
        />
    );
};

export default connect(({ companyAdmin: { floorsReducer } }, ownProps) => ({
    isFetching: floorsReducer.isFetching,
    error: floorsReducer.error,
    floors: ownProps.ids
        .map(id => floorsReducer.floors[id])
        .filter(item => item)
        .sort(hierarchySort)
}))(FloorTableContainer);
