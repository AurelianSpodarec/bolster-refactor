import React from 'react';
import moment from 'moment-timezone';

import PinHistoryDetailsItemContainer from '../containers/PinHistoryDetailsItemContainer';

const PinDetails = ({ history, drawingID, historyCount }) => (
    <PinHistoryDetailsItemContainer
        key={history.id}
        history={history}
        drawingID={drawingID}
        historyCount={historyCount}
    />
);

export default PinDetails;
