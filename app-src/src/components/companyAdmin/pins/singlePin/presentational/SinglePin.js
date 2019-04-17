import React from 'react';

import SinglePinMapContainer from '../containers/SinglePinMapContainer';
import PinDetailsContainer from '../containers/PinDetailsContainer';
import PinHistoriesContainer from '../containers/PinHistoriesContainer';

const SinglePin = () => (
    <>
        <div className="size-lg-8">
            <SinglePinMapContainer />
            <PinDetailsContainer />
        </div>
        <div className="size-lg-4">
            <PinHistoriesContainer />
        </div>
    </>
);

export default SinglePin;
