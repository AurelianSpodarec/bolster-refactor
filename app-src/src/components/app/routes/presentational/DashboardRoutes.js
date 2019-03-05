import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'components/dashboard/dashboard/presentational/Dashboard';

const AuthRoutes = () => (
    <Switch>
        <Route exact path="/" component={Dashboard} />
    </Switch>
);

export default AuthRoutes;
