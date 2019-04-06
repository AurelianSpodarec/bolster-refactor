import React from 'react';

import BreadcrumbContainer from '../containers/BreadcrumbContainer';
import SinglePinMapContainer from '../containers/SinglePinMapContainer';
import PinHistoriesListContainer from '../containers/PinHistoriesListContainer';
import PinDetailsContainer from '../containers/PinDetailsContainer';
import PinHistoriesContainer from '../containers/PinHistoriesContainer';

const SinglePin = () => (
    <>
        <BreadcrumbContainer />
        <div className="size-lg-8">
            <SinglePinMapContainer />
            <PinHistoriesContainer />
        </div>
        <div className="size-lg-4">
            <PinDetailsContainer />
        </div>
    </>
);

export default SinglePin;
