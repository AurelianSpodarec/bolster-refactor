import React from 'react';

import SingleDrawingRouteContainer from '../containers/SingleDrawingRouteContainer';
import SingleDrawingHeaderContainer from '../containers/SingleDrawingHeaderContainer';

const SingleDrawing = () => (
    <div className="size-lg-12">
        <SingleDrawingHeaderContainer />
        <SingleDrawingRouteContainer />
    </div>
);

export default SingleDrawing;
