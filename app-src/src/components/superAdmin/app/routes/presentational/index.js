import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ServicesRoutes from './ServicesRoutes';
import UsersRoutes from './UsersRoutes.js';
import EnquiriesRoutes from './EnquiriesRouter';
import CompaniesRoutes from './CompaniesRoutes';
import GenerationQueueRoutes from './GenerationQueueRoutes';

const AdminRoutes = ({ base = '/admin' }) => (
    <SwitchWith404>
        <Route path={`${base}/services`} component={ServicesRoutes} />
        <Route path={`${base}/companies`} component={CompaniesRoutes} />
        <Route path={`${base}/users`} component={UsersRoutes} />
        <Route
            path={`${base}/generation-queue`}
            component={GenerationQueueRoutes}
        />
        <Route
            path={`${base}/site-management/user-enquiries`}
            component={EnquiriesRoutes}
        />
    </SwitchWith404>
);

export default AdminRoutes;
