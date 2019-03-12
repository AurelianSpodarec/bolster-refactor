import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';
import SingleDrawingRouteContainer from '../containers/SingleDrawingRouteContainer';

const Drawing = () => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]}>
            <div className="breadcrumb-tabs">
                <TabsContainer />
            </div>
        </Breadcrumb>

        <SingleDrawingRouteContainer />
    </div>
);

export default Drawing;
