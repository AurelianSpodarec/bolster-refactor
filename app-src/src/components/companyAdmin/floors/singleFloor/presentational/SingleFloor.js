import React from 'react';

import SingleFloorHeaderContainer from '../containers/SingleFloorHeaderContainer';
import FloorGeneralOverview from './FloorGeneralOverview';
import SingleFloorRouteContainer from '../containers/SingleFloorRouteContainer';

const Floor = () => (
    <div className="size-lg-12">
        <div className="size-lg-12">
            <SingleFloorHeaderContainer />
            <SingleFloorRouteContainer />
        </div>
    </div>
);

export default Floor;
