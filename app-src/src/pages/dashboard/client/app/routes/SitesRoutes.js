import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import AllSitesContainer from 'pages/dashboard/client/sites/allSites/containers/AllSitesContainer';
import SingleSiteContainer from 'pages/dashboard/client/sites/singleSite/containers/SingleSiteContainer';

const SitesRoutes = ({ base = '/client/sites' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllSitesContainer} />
        <Route exact path={`${base}/:id`} component={SingleSiteContainer} />
    </SwitchWith404>
);

export default SitesRoutes;
