import React from 'react';
import { Route } from 'react-router-dom';

import CompanyAdminsContainer from 'components/userManagement/companyAdmins/containers/CompanyAdminsContainer';

import SwitchWith404 from '../SwitchWith404';

const UserManagementRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/company-admins`}
            component={CompanyAdminsContainer}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
