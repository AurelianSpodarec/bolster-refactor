import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import DashboardContainer from 'components/companyAdmin/dashboard/containers/DashboardContainer';

import withSubscriptionAuth from '../../hocs/withSubscriptionAuth';
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
import RecentlyDeletedRoutes from './RecentlyDeletedRoutes';
import SettingsRoutes from './SettingsRoutes';
// import TransferRequestsRoutes from './TransferRequestsRoutes';
import TermsRoutes from './TermsRoutes';
import DropdownOptionsRoutes from './DropdownOptionsRoutes';
import HeadquartersRoutes from './HeadquartersRoutes';
import ApprovedCompaniesRoutes from './ApprovedCompaniesRoutes';

const CompanyRoutes = ({ base = '/company' }) => (
    <SwitchWith404>
        <Route exact path={base} component={withSubscriptionAuth(DashboardContainer)} />
        <Route path={`${base}/buildings`} component={withSubscriptionAuth(BuildingsRoutes)} />
        <Route path={`${base}/drawings`} component={withSubscriptionAuth(DrawingsRoutes)} />
        <Route path={`${base}/floors`} component={withSubscriptionAuth(FloorRoutes)} />
        <Route path={`${base}/headquarters`} component={withSubscriptionAuth(HeadquartersRoutes)} />
        <Route path={`${base}/invoices`} component={InvoicesRoutes} />
        <Route path={`${base}/message-centre`} component={withSubscriptionAuth(MessagesRoutes)} />
        <Route path={`${base}/pins`} component={withSubscriptionAuth(PinRoutes)} />
        <Route path={`${base}/profile`} component={ProfilesRoutes} />
        <Route path={`${base}/reports`} component={withSubscriptionAuth(ReportsRoutes)} />
        <Route path={`${base}/recently-deleted`} component={RecentlyDeletedRoutes} />
        <Route path={`${base}/settings`} component={SettingsRoutes} />
        <Route path={`${base}/sites`} component={withSubscriptionAuth(SitesRoutes)} />
        <Route path={`${base}/subscription`} component={SubscriptionRoutes} />
        <Route path={`${base}/tools`} component={withSubscriptionAuth(ToolsRoutes)} />
        <Route path={`${base}/terms`} component={withSubscriptionAuth(TermsRoutes)} />
        <Route
            path={`${base}/approved-companies`}
            component={withSubscriptionAuth(ApprovedCompaniesRoutes)}
        />
        <Route
            path={`${base}/users-management`}
            component={withSubscriptionAuth(UserManagementRoutes)}
        />
        <Route
            path={`${base}/dropdown-options`}
            component={withSubscriptionAuth(DropdownOptionsRoutes)}
        />
    </SwitchWith404>
);

export default CompanyRoutes;
