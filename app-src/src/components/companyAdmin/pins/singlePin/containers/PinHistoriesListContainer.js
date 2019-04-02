import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PinHistoriesList from '../presentational/PinHistoriesList';

const PinHistoriesListContainer = ({
    isFetching,
    error,
    histories,
    selectedHistoryId
}) => {
    return (
        <PinHistoriesList
            isFetching={isFetching}
            error={error}
            histories={histories.filter(hist => hist.id !== selectedHistoryId)}
            historyCount={histories.length}
        />
    );
};

export default withRouter(
    connect(({ companyAdmin: { pinHistoriesReducer } }) => {
        return {
            isFetching: pinHistoriesReducer.isFetching,
            error: pinHistoriesReducer.error,
            histories: Object.values(pinHistoriesReducer.histories),
            selectedHistoryId: pinHistoriesReducer.selectedHistoryId
        };
    })(PinHistoriesListContainer)
);
