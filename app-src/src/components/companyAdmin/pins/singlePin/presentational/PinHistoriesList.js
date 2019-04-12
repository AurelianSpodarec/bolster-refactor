import React from 'react';

import PinHistoriesListItemContainer from '../containers/PinHistoriesListItemContainer';

const PinHistoriesList = ({ otherHistories, historyCount }) => {
    if (!(otherHistories && otherHistories.length)) {
        return (
            <p
                className="no-data size-lg-12"
                style={{ paddingLeft: 15, paddingRight: 15 }}
            >
                No other pin histories
            </p>
        );
    }

    return otherHistories.map(history => (
        <PinHistoriesListItemContainer
            key={history.id}
            history={history}
            historyCount={historyCount}
        />
    ));
};

export default PinHistoriesList;
