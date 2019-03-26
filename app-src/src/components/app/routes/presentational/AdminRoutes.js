import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import ServicesRoutes from './ServicesRoutes';
import UsersRoutes from './UsersRoutes.js';
import EnquiriesRoutes from './EnquiriesRouter';

const AdminRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route path={`${baseUrl}/services`} component={ServicesRoutes} />
        <Route path={`${baseUrl}/users`} component={UsersRoutes} />
        <Route
            path={`${baseUrl}/site-management/user-enquiries`}
            component={EnquiriesRoutes}
        />
    </SwitchWith404>
);

export default AdminRoutes;
