import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AllSights from 'components/sites/allSites/presentational/AllSites';

const SitesRoutes = () => (
    <Switch>
        <Route exact path="/sites" component={AllSights} />
    </Switch>
);

export default SitesRoutes;
