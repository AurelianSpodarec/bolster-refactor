import React from 'react';
import moment from 'moment';

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

    return [...histories]
        .sort((a, b) => moment(b.dateAdded) - moment(a.dateAdded))
        .reverse()
        .map(history => (
            <PinHistoriesListItemContainer
                key={history.id}
                history={history}
                historyCount={historyCount}
                selectedHistoryId={selectedHistoryId}
            />
        ));
};

export default PinHistoriesList;
