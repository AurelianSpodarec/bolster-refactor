import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import AllSights from 'components/sites/allSites/presentational/AllSites';
import Site from 'components/sites/singleSite/presentational/Site';

const SitesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllSights} />
        <Route exact path={`${baseUrl}/:id`} component={Site} />
    </SwitchWith404>
);

export default SitesRoutes;
