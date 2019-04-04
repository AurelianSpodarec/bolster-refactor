import React from 'react';
import { Route } from 'react-router-dom';

import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/containers/AllCompanyAdminsContainer';

import SwitchWith404 from '../SwitchWith404';
import AllOperativesContainer from 'components/companyAdmin/userManagement/operatives/containers/AllOperativesContainer';
import CreateOperative from 'components/companyAdmin/userManagement/operatives/presentational/CreateOperative';
import CreateCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/presentational/CreateCompanyAdmin';
import EditOperative from 'components/companyAdmin/userManagement/operatives/containers/EditOperativeFormContainer';

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
        <Route
            exact
            path={`${baseUrl}/company-admins/create`}
            component={CreateCompanyAdmin}
        />
        <Route
            exact
            path={`${baseUrl}/operatives/create`}
            component={CreateOperative}
        />
        <Route
            exact
            path={`${baseUrl}/operatives/:id/edit`}
            component={EditOperative}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
