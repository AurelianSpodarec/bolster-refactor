import React from 'react';
import moment from 'moment-timezone';

import PinHistoryDetailsItemContainer from '../containers/PinHistoryDetailsItemContainer';

const PinDetails = ({ histories, drawingID }) =>
    [...histories]
        .sort((a, b) => moment(b.dateAdded) - moment(a.dateAdded))
        .reverse()
        .map(history => (
            <PinHistoryDetailsItemContainer
                key={history.id}
                history={history}
                historyCount={histories.length}
                drawingID={drawingID}
            />
        ));

export default PinDetails;
