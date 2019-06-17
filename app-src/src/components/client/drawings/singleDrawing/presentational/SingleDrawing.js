import React from 'react';

import SingleDrawingHeaderContainer from '../containers/SingleDrawingHeaderContainer';
import DrawingMapGeneralContainer from '../containers/DrawingMapGeneralContainer';

const SingleDrawing = () => (
    <div className="size-lg-12">
        <SingleDrawingHeaderContainer />
        <DrawingMapGeneralContainer />
    </div>
);

export default SingleDrawing;
