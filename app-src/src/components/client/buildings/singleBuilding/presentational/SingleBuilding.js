import React from 'react';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import BuildingFloorsTableContainer from '../containers/BuildingFloorsTableContainer';
import BuildingPageHeaderContainer from '../containers/BuildingPageHeaderContainer';

const SingleBuilding = () => (
    <>
        <div className="size-lg-12">
            <BuildingPageHeaderContainer />
        </div>

        <div className=" size-lg-12">
            <BuildingDetailsContainer />
        </div>

        <div className="size-lg-12">
            <BuildingFloorsTableContainer />
        </div>
    </>
);

export default SingleBuilding;
