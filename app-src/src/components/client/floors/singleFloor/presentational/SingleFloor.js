import React from 'react';

import SingleFloorHeaderContainer from '../containers/SingleFloorHeaderContainer';
import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import FloorDrawingsTableContainer from '../containers/FloorDrawingsTableContainer';

const Floor = () => (
    <div className="size-lg-12">
        <div className="size-lg-12">
            <SingleFloorHeaderContainer />
        </div>

        <div className="size-lg-4">
            <FloorDetailsContainer />
        </div>

        <div className="size-lg-8">
            <FloorDrawingsTableContainer />
        </div>
    </div>
);

export default Floor;
