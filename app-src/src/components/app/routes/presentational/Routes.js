import React from 'react';
import { Route } from 'react-router-dom';

import withShowLayout from 'components/layout/misc/hocs/withShowLayout';
import withAuth from 'components/auth/auth/hocs/withAuth';

import SwitchWith404 from './SwitchWith404';
import Dashboard from 'components/dashboard/dashboard/presentational/Dashboard';
import NotFound from 'components/notFound/presentational/NotFound';

import AuthRoutes from './AuthRoutes';
import SitesRoutes from './SitesRoutes';
import BuildingsRoutes from './BuildingsRoutes';
import FloorRoutes from './FloorRoutes';
import DrawingsRoutes from './DrawingsRoutes';
import MessagesRoutes from './MessagesRoutes';
import UserManagementRoutes from './UserManagementRoutes.js';
import PinRoutes from './PinRoutes';
import ReportsRoutes from './ReportsRoutes';
import ToolsRoutes from './ToolsRoutes';

const Routes = ({ showLoggedInLayout }) => (
    <div id="page-area" className={`${!showLoggedInLayout ? 'full' : ''}`}>
        <SwitchWith404>
            <Route exact path="/" component={withAuth(Dashboard)} />
            <Route path="/auth" component={AuthRoutes} />
            <Route path="/sites" component={withAuth(SitesRoutes)} />
            <Route path="/buildings" component={withAuth(BuildingsRoutes)} />
            <Route path="/floors" component={withAuth(FloorRoutes)} />
            <Route path="/drawings" component={withAuth(DrawingsRoutes)} />
            <Route path="/messages" component={withAuth(MessagesRoutes)} />
            <Route
                path="/user-management"
                component={withAuth(UserManagementRoutes)}
            />
            <Route path="/pins" component={withAuth(PinRoutes)} />
            <Route path="/reports" component={withAuth(ReportsRoutes)} />
            <Route path="/tools" component={withAuth(ToolsRoutes)} />
            <Route exact path="/404" component={NotFound} />
        </SwitchWith404>
    </div>
);

export default withShowLayout(Routes);
