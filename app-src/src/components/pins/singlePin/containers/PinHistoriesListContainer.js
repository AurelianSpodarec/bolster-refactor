import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PinHistoriesList from '../presentational/PinHistoriesList';

const PinHistoriesListContainer = ({
    isFetching,
    error,
    histories,
    historyCount
}) => {
    return (
        <PinHistoriesList
            isFetching={isFetching}
            error={error}
            histories={histories}
            historyCount={historyCount}
        />
    );
};

export default withRouter(
    connect(({ pinHistoriesReducer }) => {
        return {
            isFetching: pinHistoriesReducer.isFetching,
            error: pinHistoriesReducer.error,
            historyCount: Object.values(pinHistoriesReducer.histories).length,
            histories: Object.values(pinHistoriesReducer.histories)
        };
    })(PinHistoriesListContainer)
);
