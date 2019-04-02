import React from 'react';
import { Route } from 'react-router-dom';

import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/containers/AllCompanyAdminsContainer';

import SwitchWith404 from '../SwitchWith404';
import AllOperativesContainer from 'components/companyAdmin/userManagement/operatives/containers/AllOperativesContainer';

const UserManagementRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/company-admins`}
            component={AllCompanyAdminsContainer}
        />
        <Route
            exact
            path={`${baseUrl}/operatives`}
            component={AllOperativesContainer}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
