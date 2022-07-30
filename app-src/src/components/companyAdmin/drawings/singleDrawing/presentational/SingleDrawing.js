import React from 'react';

import SingleDrawingHeaderContainer from '../containers/SingleDrawingHeaderContainer';
import SingleDrawingRouteContainer from '../containers/SingleDrawingRouteContainer';
import CreateAndViewPinButtons from './CreateAndViewPinButtons';

const SingleDrawing = () => (
    <>
        <SingleDrawingHeaderContainer />
        <CreateAndViewPinButtons />
        <SingleDrawingRouteContainer />
    </>
);

export default SingleDrawing;
