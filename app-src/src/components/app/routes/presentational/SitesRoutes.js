import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AllSights from 'components/sites/allSites/presentational/AllSites';
import Site from 'components/sites/singleSite/presentational/Site';

const SitesRoutes = () => (
    <Switch>
        <Route exact path="/sites" component={AllSights} />
        <Route exact path="/site/single" component={Site} />
    </Switch>
);

export default SitesRoutes;
