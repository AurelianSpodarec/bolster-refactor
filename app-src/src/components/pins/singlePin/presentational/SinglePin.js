import React from 'react';

import BreadcrumbContainer from '../containers/BreadcrumbContainer';
import SinglePinMapContainer from '../containers/SinglePinMapContainer';
import PinHistoriesListContainer from '../containers/PinHistoriesListContainer';
import PinDetailsContainer from '../containers/PinDetailsContainer';

const SinglePin = () => (
    <div>
        <BreadcrumbContainer />
        <div className="size-lg-8">
            <SinglePinMapContainer />
            <PinHistoriesListContainer />
        </div>
        <div className="size-lg-4">
            <PinDetailsContainer />
        </div>
    </div>
);

export default SinglePin;
