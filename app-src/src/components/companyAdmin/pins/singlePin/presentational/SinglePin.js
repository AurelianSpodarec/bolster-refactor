import React from 'react';

import SinglePinMapContainer from '../containers/SinglePinMapContainer';
import PinDetailsContainer from '../containers/PinDetailsContainer';
import SinglePinHeaderContainer from '../containers/SinglePinHeaderContainer';

const SinglePin = ({ isLoading }) => (
    <>
        <SinglePinHeaderContainer />
        <div className="size-lg-12">
            <SinglePinMapContainer />
            {/* <PinHistoriesContainer /> */}

            <PinDetailsContainer isLoading={isLoading} />
        </div>
    </>
);

export default SinglePin;
