import React from 'react';

import PinHistoryDetailsItemContainer from '../containers/PinHistoryDetailsItemContainer';

const PinDetails = ({ history, drawingID, isLoading }) => (
    <PinHistoryDetailsItemContainer
        key={history.id}
        history={history}
        drawingID={drawingID}
        isLoading={isLoading}
    />
);

export default PinDetails;
