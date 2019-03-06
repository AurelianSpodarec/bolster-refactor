import React from 'react';

import BreadcrumbContainer from 'components/shared/generic/breadcrumb/containers/BreadcrumbContainer';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';
import SingleDrawingRouteContainer from '../containers/SingleDrawingRouteContainer';

const Drawing = () => (
    <div className="size-lg-12">
        <BreadcrumbContainer>
            <TabsContainer />
        </BreadcrumbContainer>

        <SingleDrawingRouteContainer />
    </div>
);

export default Drawing;
