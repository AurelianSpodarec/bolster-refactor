import React from 'react';
import { Route } from 'react-router-dom';

import AllAdmins from 'components/userManagement/allAdmins/presentational/AllAdmins';

import SwitchWith404 from './SwitchWith404';
import AllUsersContainer from 'components/userManagement/allUsers/containers/AllUsersContainer';

const UserManagementRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllUsersContainer} />
        <Route exact path={`${baseUrl}/admins`} component={AllAdmins} />
    </SwitchWith404>
);

export default UserManagementRoutes;
