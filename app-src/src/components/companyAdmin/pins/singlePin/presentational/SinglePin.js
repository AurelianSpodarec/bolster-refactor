import React from 'react';

import SinglePinMapContainer from '../containers/SinglePinMapContainer';
import PinDetailsContainer from '../containers/PinDetailsContainer';
import SinglePinHeaderContainer from '../containers/SinglePinHeaderContainer';

const SinglePin = () => (
    <>
        <SinglePinHeaderContainer />
        <div className="size-lg-12">
            <SinglePinMapContainer />
            {/* <PinHistoriesContainer /> */}

            <PinDetailsContainer />
        </div>
    </>
);

export default SinglePin;
