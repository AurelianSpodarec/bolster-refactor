import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ClientsAccessContainer from 'components/shared/clients/containers/ClientsAccessContainer';

const UserManagementRoutes = ({ base = '/company/user-management' }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${base}/access`}
            component={ClientsAccessContainer}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
