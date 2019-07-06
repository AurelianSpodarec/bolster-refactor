import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ServicesRoutes from './ServicesRoutes';
import UsersRoutes from './UsersRoutes.js';
import EnquiriesRoutes from './EnquiriesRouter';
import CompaniesRoutes from './CompaniesRoutes';
import CompanyReportsRoutes from './CompanyReportsRoutes';
import ProfilesRoutes from './ProfilesRoutes';
import InvoicesRoutes from './InvoicesRoutes';
import MoveToolRoutes from './MoveToolRoutes';
import DemoRequestsRoutes from './DemoRequestsRoutes';
import SOSManagementRoutes from './SOSManagementRoutes';
import DashboardContainer from 'components/superAdmin/dashboard/containers/DashboardContainer';

const AdminRoutes = ({ base = '/admin' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={DashboardContainer} />
        <Route path={`${base}/services`} component={ServicesRoutes} />
        <Route path={`${base}/companies`} component={CompaniesRoutes} />
        <Route path={`${base}/users`} component={UsersRoutes} />
        <Route path={`${base}/profile`} component={ProfilesRoutes} />
        <Route
            path={`${base}/company-reports`}
            component={CompanyReportsRoutes}
        />
        <Route path={`${base}/invoices`} component={InvoicesRoutes} />

        <Route
            path={`${base}/site-management/user-enquiries`}
            component={EnquiriesRoutes}
        />
        <Route path={`${base}/enquiries`} component={EnquiriesRoutes} />

        <Route path={`${base}/demo-requests`} component={DemoRequestsRoutes} />
        <Route path={`${base}/move-tool`} component={MoveToolRoutes} />
        <Route
            path={`${base}/sos-management`}
            component={SOSManagementRoutes}
        />
    </SwitchWith404>
);

export default AdminRoutes;
