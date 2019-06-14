import React from 'react';

import PinHistoryDetailsItemContainer from '../containers/PinHistoryDetailsItemContainer';

const PinDetails = ({ history, drawingID }) => (
    <PinHistoryDetailsItemContainer
        key={history.id}
        history={history}
        drawingID={drawingID}
    />
);

export default PinDetails;
