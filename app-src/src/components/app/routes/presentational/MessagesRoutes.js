import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AllMessages from 'components/messages/allMessages/presentational/AllMessages';

const AuthRoutes = () => (
    <Switch>
        <Route exact path="/messages" component={AllMessages} />
    </Switch>
);

export default AuthRoutes;
