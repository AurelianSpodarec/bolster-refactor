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
import ActivityLogRoutes from './ActivityLogRoutes';
// import TransferRequestsRoutes from './TransferRequestsRoutes';
import TermsRoutes from './TermsRoutes';
import HeadquartersRoutes from './HeadquartersRoutes';
import ApprovedCompaniesRoutes from './ApprovedCompaniesRoutes';
import UserGuidesRoutes from './UserGuidesRoutes';
import ReleaseNotesRoutes from './ReleaseNotesRoutes';
import CompanySelection from 'components/companyAdmin/companySelection/CompanySelection';
import UpcomingAlertsRoutes from './UpcomingAlertsRoutes';
import BugReportRoutes from './BugReportRoutes';
import DocumentLibraryRoutes from './DocumentLibraryRoutes';
import JobReferencesRoutes from './JobReferencesRoutes';
import PinOptionsRoutes from './PinOptionsRoutes';
import PushNotificationsRoutes from './PushNotificationsRoutes';
import withActiveAccount from '../../hocs/withActiveAccount';
import AccountDeactivated from 'components/shared/accountDeactivated/AccountDeactivated';

// import withTermsAuth from '../../hocs/withTermsAuth';

const CompanyRoutes = ({ base = '/company' }) => (
    <SwitchWith404>
        <Route
            exact
            path={base}
            component={withActiveAccount(withSubscriptionAuth(DashboardContainer))}
        />
        <Route path={`${base}/company-selection`} component={CompanySelection} />
        <Route
            path={`${base}/buildings`}
            component={withActiveAccount(withSubscriptionAuth(BuildingsRoutes))}
        />
        <Route
            path={`${base}/drawings`}
            component={withActiveAccount(withSubscriptionAuth(DrawingsRoutes))}
        />
        <Route
            path={`${base}/floors`}
            component={withActiveAccount(withSubscriptionAuth(FloorRoutes))}
        />
        <Route
            path={`${base}/headquarters`}
            component={withActiveAccount(withSubscriptionAuth(HeadquartersRoutes))}
        />
        <Route path={`${base}/invoices`} component={withActiveAccount(InvoicesRoutes)} />
        <Route
            path={`${base}/message-centre`}
            component={withActiveAccount(withSubscriptionAuth(MessagesRoutes))}
        />
        <Route
            path={`${base}/pins`}
            component={withActiveAccount(withSubscriptionAuth(PinRoutes))}
        />
        <Route path={`${base}/profile`} component={withActiveAccount(ProfilesRoutes)} />
        <Route
            path={`${base}/reports`}
            component={withActiveAccount(withSubscriptionAuth(ReportsRoutes))}
        />
        <Route path={`${base}/recently-deleted`} component={RecentlyDeletedRoutes} />
        <Route path={`${base}/settings`} component={withActiveAccount(SettingsRoutes)} />
        <Route path={`${base}/activity-log`} component={withActiveAccount(ActivityLogRoutes)} />
        <Route path={`${base}/bug-report`} component={withActiveAccount(BugReportRoutes)} />
        <Route
            path={`${base}/sites`}
            component={withActiveAccount(withSubscriptionAuth(SitesRoutes))}
        />
        <Route path={`${base}/subscription`} component={withActiveAccount(SubscriptionRoutes)} />
        <Route
            path={`${base}/tools`}
            component={withActiveAccount(withSubscriptionAuth(ToolsRoutes))}
        />
        <Route
            path={`${base}/terms`}
            component={withActiveAccount(withSubscriptionAuth(TermsRoutes))}
        />
        <Route
            path={`${base}/user-guides`}
            component={withActiveAccount(withSubscriptionAuth(UserGuidesRoutes))}
        />
        <Route path={`${base}/release-notes`} component={withActiveAccount(ReleaseNotesRoutes)} />
        <Route
            path={`${base}/upcoming-alerts`}
            component={withActiveAccount(UpcomingAlertsRoutes)}
        />
        <Route
            path={`${base}/approved-companies`}
            component={withActiveAccount(withSubscriptionAuth(ApprovedCompaniesRoutes))}
        />
        <Route
            path={`${base}/users-management`}
            component={withActiveAccount(withSubscriptionAuth(UserManagementRoutes))}
        />
        <Route
            path={`${base}/company-documents`}
            component={withActiveAccount(withSubscriptionAuth(DocumentLibraryRoutes))}
        />
        <Route
            path={`${base}/job-references`}
            component={withActiveAccount(withSubscriptionAuth(JobReferencesRoutes))}
        />
        <Route
            path={`${base}/pin-options`}
            component={withActiveAccount(withSubscriptionAuth(PinOptionsRoutes))}
        />
        <Route
            path={`${base}/push-notifications`}
            component={withActiveAccount(withSubscriptionAuth(PushNotificationsRoutes))}
        />

        <Route path={`${base}/deactivated`} component={AccountDeactivated} />
    </SwitchWith404>
);

export default CompanyRoutes;
