import React from 'react';

import PinHistoryDetailsItemContainer from '../containers/PinHistoryDetailsItemContainer';

const PinDetails = ({ history, drawingID, historyCount, isLoading }) => (
    <PinHistoryDetailsItemContainer
        key={history.id}
        history={history}
        drawingID={drawingID}
        historyCount={historyCount}
        isLoading={isLoading}
    />
);

export default PinDetails;
