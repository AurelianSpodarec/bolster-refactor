import React from 'react';
import { Route } from 'react-router-dom';
import withShowLayout from 'components/layout/misc/hocs/withShowLayout';

import SwitchWith404 from './SwitchWith404';
import Dashboard from 'components/dashboard/dashboard/presentational/Dashboard';

import AuthRoutes from './AuthRoutes';
import SitesRoutes from './SitesRoutes';
import DrawingsRoutes from './DrawingsRoutes';
import CreditLogRoutes from './CreditLogRoutes';
import MessagesRoutes from './MessagesRoutes';
import UserManagementRoutes from './UserManagementRoutes.js';

const Routes = ({ showLoggedInLayout }) => (
    <div
        id="page-area"
        className={`size-lg-${showLoggedInLayout ? '9' : '12'}`}
    >
        <SwitchWith404>
            <Route exact path="/" component={Dashboard} />
            <Route path="/auth" component={AuthRoutes} />
            <Route path="/sites" component={SitesRoutes} />
            <Route path="/drawings" component={DrawingsRoutes} />
            <Route path="/credit-logs" component={CreditLogRoutes} />
            <Route path="/messages" component={MessagesRoutes} />
            <Route path="/user-management" component={UserManagementRoutes} />
        </SwitchWith404>
    </div>
);

export default withShowLayout(Routes);
