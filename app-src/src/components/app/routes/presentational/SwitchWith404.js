import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from 'components/notFound/presentational/NotFound';

const SwitchWith404 = ({ children }) => (
    <Switch>
        {children}
        <Route component={NotFound} />
    </Switch>
);

export default SwitchWith404;
