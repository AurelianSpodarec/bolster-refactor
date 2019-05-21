import React from 'react';

import SingleFloorHeaderContainer from '../containers/SingleFloorHeaderContainer';
import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import FloorDrawingsTableContainer from '../containers/FloorDrawingsTableContainer';

const Floor = () => (
    <div className="size-lg-12">
        <div className="size-lg-12">
            <SingleFloorHeaderContainer />
        </div>

        <div className=" flex-item size-lg-12">
            <FloorDetailsContainer />
        </div>

        <div className="size-lg-12">
            <FloorDrawingsTableContainer />
        </div>
    </div>
);

export default Floor;
