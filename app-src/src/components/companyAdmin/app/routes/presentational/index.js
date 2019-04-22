import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import Dashboard from 'components/shared/dashboard/dashboard/presentational/Dashboard';

import SitesRoutes from './SitesRoutes';
import BuildingsRoutes from './BuildingsRoutes';
import FloorRoutes from './FloorRoutes';
import DrawingsRoutes from './DrawingsRoutes';
import MessagesRoutes from './MessagesRoutes';
import UserManagementRoutes from './UserManagementRoutes.js';
import PinRoutes from './PinRoutes';
import ReportsRoutes from './ReportsRoutes';
import ToolsRoutes from './ToolsRoutes';
import SubscriptionRoutes from './SubscriptionRoutes';
import InvoicesRoutes from './InvoicesRoutes.js';
import ProfilesRoutes from './ProfilesRoutes';
import SettingsRoutes from './SettingsRoutes';
import TransferRequestsRoutes from './TransferRequestsRoutes';
import HeadquartersRoutes from './HeadquartersRoutes';

const CompanyRoutes = ({ base = '/company' }) => (
    <SwitchWith404>
        <Route exact path={base} component={Dashboard} />
        <Route path={`${base}/buildings`} component={BuildingsRoutes} />
        <Route path={`${base}/drawings`} component={DrawingsRoutes} />
        <Route path={`${base}/floors`} component={FloorRoutes} />
        <Route path={`${base}/headquarters`} component={HeadquartersRoutes} />
        <Route path={`${base}/invoices`} component={InvoicesRoutes} />
        <Route path={`${base}/message-centre`} component={MessagesRoutes} />
        <Route path={`${base}/pins`} component={PinRoutes} />
        <Route path={`${base}/profile`} component={ProfilesRoutes} />
        <Route path={`${base}/reports`} component={ReportsRoutes} />
        <Route path={`${base}/settings`} component={SettingsRoutes} />
        <Route path={`${base}/sites`} component={SitesRoutes} />
        <Route path={`${base}/subscription`} component={SubscriptionRoutes} />
        <Route path={`${base}/tools`} component={ToolsRoutes} />
        <Route
            path={`${base}/users-management`}
            component={UserManagementRoutes}
        />
    </SwitchWith404>
);

export default CompanyRoutes;
