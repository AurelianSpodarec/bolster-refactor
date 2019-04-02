import React from 'react';
import { connect } from 'react-redux';

import BuildingsTable from '../presentational/BuildingsTable';

const BuildingsTableContainer = ({ isFetching, error, buildings }) => {
    return (
        <BuildingsTable
            headers={['Building name', 'Permissions', 'Action']}
            isFetching={isFetching}
            error={error}
            buildings={buildings}
        />
    );
};

export default connect(({ buildingsReducer }, ownProps) => ({
    isFetching: buildingsReducer.isFetching,
    error: buildingsReducer.error,
    buildings: ownProps.ids
        .map(id => buildingsReducer.buildings[id])
        .filter(item => item)
}))(BuildingsTableContainer);
