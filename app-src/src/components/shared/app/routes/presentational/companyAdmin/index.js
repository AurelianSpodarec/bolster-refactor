import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import Dashboard from 'components/shared/dashboard/dashboard/presentational/Dashboard';
import NotFound from 'components/shared/notFound/presentational/NotFound';

import SitesRoutes from './SitesRoutes';
import BuildingsRoutes from './BuildingsRoutes';
import FloorRoutes from './FloorRoutes';
import DrawingsRoutes from './DrawingsRoutes';
import MessagesRoutes from './MessagesRoutes';
import UserManagementRoutes from './UserManagementRoutes.js';
import PinRoutes from './PinRoutes';
import ReportsRoutes from './ReportsRoutes';
import ToolsRoutes from './ToolsRoutes';
import ClientsRoutes from './ClientsRoutes';

const CompanyRoutes = () => (
    <SwitchWith404>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/404" component={NotFound} />
        <Route path="/sites" component={SitesRoutes} />
        <Route path="/buildings" component={BuildingsRoutes} />
        <Route path="/floors" component={FloorRoutes} />
        <Route path="/drawings" component={DrawingsRoutes} />
        <Route path="/messages" component={MessagesRoutes} />
        <Route path="/users-management" component={UserManagementRoutes} />
        <Route path="/pins" component={PinRoutes} />
        <Route path="/reports" component={ReportsRoutes} />
        <Route path="/tools" component={ToolsRoutes} />
        <Route path="/clients" component={ClientsRoutes} />
    </SwitchWith404>
);

export default CompanyRoutes;
