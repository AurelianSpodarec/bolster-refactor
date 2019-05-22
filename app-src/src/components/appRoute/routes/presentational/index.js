import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import withAuth from 'components/shared/auth/auth/hocs/withAuth';
import NotFound from 'components/shared/notFound/presentational/NotFound';
import SwitchWith404 from './SwitchWith404';

import AuthApp from 'components/auth/app/app/presentational/AuthApp';
import TestApp from 'components/test/app/app/presentational/TestApp';
import AdminAppContainer from 'components/superAdmin/app/app/containers/AdminAppContainer';
import CompanyAppContainer from 'components/companyAdmin/app/app/containers/CompanyAppContainer';

import { AUTH_TYPES } from 'constants/shared/auth';
import ClientAppContainer from 'components/client/app/app/containers/ClientAppContainer';

// ! uncomment this when client log in is sorted
const { SUPER_ADMIN, COMPANY /*CLIENT*/ } = AUTH_TYPES;
const Routes = () => (
    <SwitchWith404>
        <Redirect exact path="/" to="/company" />
        <Route exact path="/404" component={NotFound} />
        <Route path="/auth" component={AuthApp} />
        <Route path="/test" component={withAuth(TestApp, COMPANY)} />
        <Route
            path="/admin"
            component={withAuth(AdminAppContainer, SUPER_ADMIN)}
        />
        <Route
            path="/company"
            component={withAuth(CompanyAppContainer, COMPANY)}
        />
        <Route
            path="/client"
            component={ClientAppContainer}
            // ! put withAuth back in once the client log in is sorted
            // component={withAuth(ClientAppContainer, CLIENT)}
        />
    </SwitchWith404>
);

export default Routes;
