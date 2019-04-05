import React from 'react';
import { Route } from 'react-router-dom';

import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/allCompanyAdmins/containers/AllCompanyAdminsContainer';

import SwitchWith404 from '../SwitchWith404';
import AllOperativesContainer from 'components/companyAdmin/userManagement/operatives/allOperatives/containers/AllOperativesContainer';
import CreateOperative from 'components/companyAdmin/userManagement/operatives/createOperative/presentational/CreateOperative';
import CreateCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdmin';
import EditCompanyUserPassword from 'components/companyAdmin/userManagement/shared/editCompanyUserPassword/presentational/EditCompanyUserPassword';
import EditCompanyUser from 'components/companyAdmin/userManagement/shared/editCompanyUser/presentational/EditCompanyUser';

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
            component={EditCompanyUser}
        />
        <Route
            exact
            path={`${baseUrl}/company-admins/:id/edit`}
            component={EditCompanyUser}
        />
        <Route
            exact
            path={`${baseUrl}/operatives/:id/edit-password`}
            component={EditCompanyUserPassword}
        />
        <Route
            exact
            path={`${baseUrl}/company-admins/:id/edit-password`}
            component={EditCompanyUserPassword}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
