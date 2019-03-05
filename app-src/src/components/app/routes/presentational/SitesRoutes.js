import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import AllSights from 'components/sites/allSites/presentational/AllSites';
import Site from 'components/sites/singleSite/presentational/Site';
import Building from 'components/buildings/building/presentational/Building';
import Floor from 'components/floors/floor/presentational/Floor';
import Drawing from 'components/drawings/drawing/presentational/Drawing';

const SitesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllSights} />
        <Route exact path={`${baseUrl}/:id`} component={Site} />
        <Route
            exact
            path={`${baseUrl}/:siteId/building/:buildingId`}
            component={Building}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/building/:buildingId/floor/:floorId`}
            component={Floor}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/building/:buildingId/floor/:floorId/drawing/:drawingId`}
            component={Drawing}
        />
    </SwitchWith404>
);

export default SitesRoutes;
