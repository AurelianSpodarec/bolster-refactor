import React from 'react';
import { Route } from 'react-router-dom';

import AllAdmins from 'components/userManagement/allAdmins/presentational/AllAdmins';

import SwitchWith404 from '../SwitchWith404';

const UserManagementRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/admins`} component={AllAdmins} />
    </SwitchWith404>
);

export default UserManagementRoutes;
