import React from 'react';

import BreadcrumbContainer from 'components/layout/breadcrumb/containers/BreadcrumbContainer';
import TabsContainer from 'components/generic/tabs/containers/TabsContainer';
import SingleDrawingRouteContainer from '../containers/SingleDrawingRouteContainer';

const Drawing = () => (
    <div className="size-lg-12">
        <div className="content-container size-lg-12">
            <div className="content-area size-lg-12">
                <BreadcrumbContainer />
                <TabsContainer />
            </div>
        </div>

        <SingleDrawingRouteContainer />
    </div>
);

export default Drawing;
