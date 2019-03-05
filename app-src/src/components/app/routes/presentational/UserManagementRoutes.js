import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AllMessages from 'components/';

const AuthRoutes = () => (
    <Switch>
        <Route path="/user-management" component={AllMessages} />
    </Switch>
);

export default AuthRoutes;
