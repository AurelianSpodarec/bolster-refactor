import React from 'react';

import PinHistoriesListItemContainer from '../containers/PinHistoriesListItemContainer';

const PinHistoriesList = ({ histories, historyCount, selectedHistoryId }) => {
    if (!(histories && histories.length)) {
        return (
            <p
                className="no-data size-lg-12"
                style={{ paddingLeft: 15, paddingRight: 15 }}
            >
                No other pin histories
            </p>
        );
    }

    return histories.map(history => (
        <PinHistoriesListItemContainer
            key={history.id}
            history={history}
            historyCount={historyCount}
            selectedHistoryId={selectedHistoryId}
        />
    ));
};

export default PinHistoriesList;
