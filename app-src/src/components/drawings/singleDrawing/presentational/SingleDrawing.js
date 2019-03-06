import React from 'react';

import TabsContainer from 'components/generic/tabs/containers/TabsContainer';
import SingleDrawingRouteContainer from '../containers/SingleDrawingRouteContainer';

const Drawing = () => (
    <div className="size-lg-12">
        <TabsContainer />
        <SingleDrawingRouteContainer />
    </div>
);

export default Drawing;
