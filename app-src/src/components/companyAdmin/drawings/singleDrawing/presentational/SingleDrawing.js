import React from 'react';

import SingleDrawingHeaderContainer from '../containers/SingleDrawingHeaderContainer';
import GeneralOverviewContainer from '../containers/GeneralOverviewContainer';

const SingleDrawing = () => (
    <div className="size-lg-12">
        <SingleDrawingHeaderContainer />
        <GeneralOverviewContainer />
    </div>
);

export default SingleDrawing;
