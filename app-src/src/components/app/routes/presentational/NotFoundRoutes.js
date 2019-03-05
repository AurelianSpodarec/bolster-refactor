import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from 'components/notFound/presentational/NotFound';

const NotFoundRoutes = () => (
    <Switch>
        <Route exact component={NotFound} />
    </Switch>
);

export default NotFoundRoutes;
