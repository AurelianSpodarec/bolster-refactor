import React from 'react';
import { Route } from 'react-router-dom';

import ClientsAccessContainer from 'components/shared/clients/containers/ClientsAccessContainer';

import SwitchWith404 from '../SwitchWith404';

const UserManagementRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/access`}
            component={ClientsAccessContainer}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
