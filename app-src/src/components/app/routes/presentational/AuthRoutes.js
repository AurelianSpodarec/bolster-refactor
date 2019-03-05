import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginContainer from 'components/auth/login/containers/LoginContainer';

const AuthRoutes = () => (
    <Switch>
        <Route exact path="/login" component={LoginContainer} />
    </Switch>
);

export default AuthRoutes;
