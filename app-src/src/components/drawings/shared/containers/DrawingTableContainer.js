import React from 'react';
import { connect } from 'react-redux';

import DrawingTable from '../presentational/DrawingTable';

const DrawingTableContainer = ({ isFetching, error, drawings }) => {
    return (
        <DrawingTable
            headers={[
                'Drawing name',
                'Lat updated',
                'Expires',
                'Permissions',
                'Action'
            ]}
            isFetching={isFetching}
            error={error}
            drawings={drawings}
        />
    );
};

export default connect(({ drawingsReducer }, ownProps) => ({
    isFetching: drawingsReducer.isFetching,
    error: drawingsReducer.error,
    drawings: ownProps.ids
        .map(id => drawingsReducer.drawings[id])
        .filter(item => item)
}))(DrawingTableContainer);
