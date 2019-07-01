import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import Dashboard from 'components/shared/dashboard/dashboard/presentational/Dashboard';
import ServicesRoutes from './ServicesRoutes';
import UsersRoutes from './UsersRoutes.js';
import EnquiriesRoutes from './EnquiriesRouter';
import CompaniesRoutes from './CompaniesRoutes';
import CompanyReportsRoutes from './CompanyReportsRoutes';
import ProfilesRoutes from './ProfilesRoutes';
import InvoicesRoutes from './InvoicesRoutes';
import SiteManagementRoutes from './SiteManagementRoutes';
import SOSManagementRoutes from './SOSManagementRoutes';

const AdminRoutes = ({ base = '/admin' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={Dashboard} />
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

        <Route
            path={`${base}/site-management`}
            component={SiteManagementRoutes}
        />
        <Route path={`${base}/sos-management`} component={SOSManagementRoutes} />
    </SwitchWith404>
);

export default AdminRoutes;
