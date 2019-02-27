import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from 'components/dashboard/presentational/Dashboard';
import AllSights from 'components/sites/allSites/presentational/AllSites';

const Routes = () => (
    <div className="container">
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/sites" component={AllSights} />
        </Switch>
    </div>
);

export default Routes;
