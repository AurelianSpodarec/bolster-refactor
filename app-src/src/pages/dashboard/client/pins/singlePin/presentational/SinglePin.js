import React from 'react';

import SinglePinMapContainer from '../containers/SinglePinMapContainer';
import PinDetailsContainer from '../containers/PinDetailsContainer';
// import PinHistoriesContainer from '../containers/PinHistoriesContainer';
import SinglePinHeaderContainer from '../containers/SinglePinHeaderContainer';

const SinglePin = ({ isLoading }) => (
    <>
        <SinglePinHeaderContainer />
        <div className="size-lg-12">
            <SinglePinMapContainer />
            <PinDetailsContainer isLoading={isLoading} />
        </div>
        {/* <div className="size-lg-4">
            <PinHistoriesContainer />
        </div> */}
    </>
);

export default SinglePin;
