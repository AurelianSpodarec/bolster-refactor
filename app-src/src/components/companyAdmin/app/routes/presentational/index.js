import React from 'react';
import { Route } from 'react-router-dom';

import withShowLayout from 'components/shared/layout/misc/hocs/withShowLayout';
import withAuth from 'components/shared/auth/auth/hocs/withAuth';

import NotFound from 'components/shared/notFound/presentational/NotFound';
import SwitchWith404 from './SwitchWith404';
import AuthRoutes from './auth';
import AdminRoutes from './superAdmin';
import CompanyAdminRoutes from './companyAdmin';
import TestRoutes from './test';

const Routes = ({ showLoggedInLayout }) => (
    <div id="page-area" className={`${!showLoggedInLayout ? 'full' : ''}`}>
        <SwitchWith404>
            <Route exact path="/404" component={NotFound} />
            <Route path="/auth" component={AuthRoutes} />
            <Route path="/admin" component={withAuth(AdminRoutes, true)} />
            <Route path="/test" component={withAuth(TestRoutes)} />
            <Route component={withAuth(CompanyAdminRoutes)} />
        </SwitchWith404>
    </div>
);

export default withShowLayout(Routes);
