import React from 'react';
import { Route } from 'react-router-dom';

import withShowLayout from 'components/layout/misc/hocs/withShowLayout';
import withAuth from 'components/auth/auth/hocs/withAuth';

import SwitchWith404 from './SwitchWith404';
import Dashboard from 'components/dashboard/dashboard/presentational/Dashboard';
import NotFound from 'components/notFound/presentational/NotFound';

import DnDExample from 'components/shared/generic/dragDrop/example/containers/Example';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './superAdmin/AdminRoutes';
import SitesRoutes from './SitesRoutes';
import CompaniesRoutes from './superAdmin/CompaniesRoutes';
import BuildingsRoutes from './BuildingsRoutes';
import FloorRoutes from './FloorRoutes';
import DrawingsRoutes from './DrawingsRoutes';
import MessagesRoutes from './MessagesRoutes';
import UserManagementRoutes from './UserManagementRoutes.js';
import PinRoutes from './PinRoutes';
import ReportsRoutes from './ReportsRoutes';
import ToolsRoutes from './ToolsRoutes';
import ServicesRoutes from './superAdmin/ServicesRoutes';

const Routes = ({ showLoggedInLayout }) => (
    <div id="page-area" className={`${!showLoggedInLayout ? 'full' : ''}`}>
        <SwitchWith404>
            <Route exact path="/dnd-example" component={DnDExample} />
            <Route exact path="/" component={withAuth(Dashboard)} />
            <Route path="/admin" component={withAuth(AdminRoutes)} />
            <Route path="/services" component={withAuth(ServicesRoutes)} />
            <Route path="/auth" component={AuthRoutes} />
            <Route path="/sites" component={withAuth(SitesRoutes)} />
            <Route path="/buildings" component={withAuth(BuildingsRoutes)} />
            <Route path="/floors" component={withAuth(FloorRoutes)} />
            <Route path="/drawings" component={withAuth(DrawingsRoutes)} />
            <Route path="/companies" component={withAuth(CompaniesRoutes)} />
            <Route path="/messages" component={withAuth(MessagesRoutes)} />
            <Route
                path="/users-management"
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
