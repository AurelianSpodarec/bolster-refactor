import React from 'react';
import moment from 'moment-timezone';

import PinHistoryDetailsItemContainer from '../containers/PinHistoryDetailsItemContainer';

const PinDetails = ({ history, drawingID, historyCount, historyVersion }) => (
    <PinHistoryDetailsItemContainer
        key={history.id}
        history={history}
        historyCount={historyCount}
        drawingID={drawingID}
        historyVersion={historyVersion}
    />
);

export default PinDetails;
