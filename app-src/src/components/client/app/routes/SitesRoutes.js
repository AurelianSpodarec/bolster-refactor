import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllSitesContainer from 'components/client/sites/allSites/containers/AllSitesContainer';
import SingleSiteContainer from 'components/client/sites/singleSite/containers/SingleSiteContainer';

const SitesRoutes = ({ base = '/client/sites' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllSitesContainer} />
        <Route exact path={`${base}/:id`} component={SingleSiteContainer} />
    </SwitchWith404>
);

export default SitesRoutes;
