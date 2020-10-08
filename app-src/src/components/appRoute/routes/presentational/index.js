import React from 'react';
import { Route } from 'react-router-dom';

import NotFound from 'components/shared/notFound/presentational/NotFound';
import SwitchWith404 from './SwitchWith404';

// import AuthApp from 'components/auth/app/app/presentational/AuthApp';  <-- needs removing once new Auth route for front end has been set up
import AdminAppContainer from 'components/superAdmin/app/app/containers/AdminAppContainer';
import CompanyAppContainer from 'components/companyAdmin/app/app/containers/CompanyAppContainer';

import ClientAppContainer from 'components/client/app/app/containers/ClientAppContainer';
import FrontEndAppContainer from 'components/frontEnd/app/app/containers/FrontEndAppContainer';

const Routes = () => (
    <SwitchWith404>
        <Route exact path="/404" component={NotFound} />
        <Route path="/auth" component={FrontEndAppContainer} />
        <Route path="/admin" component={AdminAppContainer} />
        <Route path="/company" component={CompanyAppContainer} />
        <Route path="/client" component={ClientAppContainer} />
        <Route path="/" component={FrontEndAppContainer} />
    </SwitchWith404>
);

export default Routes;
