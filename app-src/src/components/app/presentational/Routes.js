import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from 'components/dashboard/presentational/Dashboard';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Dashboard} />
    </Switch>
);

export default Routes;
