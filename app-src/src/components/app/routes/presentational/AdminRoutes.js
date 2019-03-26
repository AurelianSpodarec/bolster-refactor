import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import ServicesRoutes from './ServicesRoutes';
import UsersRoutes from './UsersRoutes.js';

const AdminRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route path={`${baseUrl}/services`} component={ServicesRoutes} />
        <Route path={`${baseUrl}/users`} component={UsersRoutes} />
    </SwitchWith404>
);

export default AdminRoutes;
