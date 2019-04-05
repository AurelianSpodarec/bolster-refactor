import React from 'react';
import { Route } from 'react-router-dom';

// import withAuth from 'components/shared/auth/auth/hocs/withAuth';

import NotFound from 'components/shared/notFound/presentational/NotFound';
import SwitchWith404 from './SwitchWith404';

import AuthApp from 'components/auth/app/app/presentational/AuthApp';
import TestApp from 'components/test/app/app/presentational/TestApp';

const Routes = () => (
    <SwitchWith404>
        <Route exact path="/404" component={NotFound} />
        <Route path="/auth" component={AuthApp} />
        <Route path="/test" component={TestApp} />
    </SwitchWith404>
);

export default Routes;
