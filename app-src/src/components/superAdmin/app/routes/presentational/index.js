import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ServicesRoutes from './ServicesRoutes';
import UsersRoutes from './UsersRoutes.js';
import ContactSubmissionsRoutes from './ContactSubmissionsRouter';
import CompaniesRoutes from './CompaniesRoutes';
import CompanyReportsRoutes from './CompanyReportsRoutes';
import ProfilesRoutes from './ProfilesRoutes';
import InvoicesRoutes from './InvoicesRoutes';
import MoveToolRoutes from './MoveToolRoutes';
import SOSManagementRoutes from './SOSManagementRoutes';
import DashboardContainer from 'components/superAdmin/dashboard/containers/DashboardContainer';
import OperativeAlertsRoutes from './OperativeAlertsRoutes';
import MergeToolRoutes from './MergeToolRoutes';
import ExpiryToolRoutes from './ExpiryToolRoutes';
import PinOptionsManufacturersRoutes from './PinOptionsManufacturersRoutes';
import UserGuidesRoutes from './UserGuidesRoutes';
import NewFeaturesRoutes from './NewFeaturesRoutes';
import TextSettingRoutes from './TextSettingRoutes';
import TrustedBySettingRoutes from './TrustedBySettingRoutes';
import LegalDocumentsRoutes from './LegalDocumentsRoutes';
import RecentlyExtendedRoutes from './RecentlyExtendedRoutes';
import BannersRoutes from './BannersRoutes';
import DemoAccessCodesRoutes from './DemoAccessCodesRoutes';
import UserCreationsRoutes from './UserCreationsRoutes';
import CompanyTrackingRoutes from './CompanyTrackingRoutes';
import BugReportsRoutes from './BugReportsRoutes';
import CompanyTimesheetsRoutes from './CompanyTimesheetsRoutes';

const AdminRoutes = ({ base = '/admin' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={DashboardContainer} />
        <Route path={`${base}/services`} component={ServicesRoutes} />
        <Route path={`${base}/companies`} component={CompaniesRoutes} />
        <Route path={`${base}/users`} component={UsersRoutes} />
        <Route path={`${base}/user-creations`} component={UserCreationsRoutes} />
        <Route path={`${base}/company-tracking`} component={CompanyTrackingRoutes} />
        <Route path={`${base}/profile`} component={ProfilesRoutes} />
        <Route path={`${base}/company-reports`} component={CompanyReportsRoutes} />
        <Route path={`${base}/invoices`} component={InvoicesRoutes} />
        <Route path={`${base}/contact-submissions`} component={ContactSubmissionsRoutes} />
        <Route path={`${base}/move-tool`} component={MoveToolRoutes} />
        <Route path={`${base}/merge-tool`} component={MergeToolRoutes} />
        <Route path={`${base}/expiry-tool`} component={ExpiryToolRoutes} />
        <Route path={`${base}/sos-management`} component={SOSManagementRoutes} />
        <Route path={`${base}/operative-alerts`} component={OperativeAlertsRoutes} />
        <Route path={`${base}/user-guides`} component={UserGuidesRoutes} />
        <Route path={`${base}/pin-options`} component={PinOptionsManufacturersRoutes} />
        <Route path={`${base}/trusted-by-settings`} component={TrustedBySettingRoutes} />
        <Route path={`${base}/text-settings`} component={TextSettingRoutes} />
        <Route path={`${base}/legal-documents`} component={LegalDocumentsRoutes} />
        <Route path={`${base}/demo-access-codes`} component={DemoAccessCodesRoutes} />
        <Route path={`${base}/new-features`} component={NewFeaturesRoutes} />
        <Route path={`${base}/recently-extended`} component={RecentlyExtendedRoutes} />
        <Route path={`${base}/banners`} component={BannersRoutes} />
        <Route path={`${base}/bug-reports`} component={BugReportsRoutes} />
        <Route path={`${base}/company-timesheets`} component={CompanyTimesheetsRoutes} />
    </SwitchWith404>
);

export default AdminRoutes;
