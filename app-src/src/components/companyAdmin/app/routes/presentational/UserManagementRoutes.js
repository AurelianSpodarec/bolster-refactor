import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/allCompanyAdmins/containers/AllCompanyAdminsContainer';
import AllOperativesContainer from 'components/companyAdmin/userManagement/operatives/allOperatives/containers/AllOperativesContainer';
import CreateOperative from 'components/companyAdmin/userManagement/operatives/createOperative/presentational/CreateOperative';
import CreateCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdmin';
import EditCompanyUserPassword from 'components/companyAdmin/userManagement/shared/editCompanyUserPassword/presentational/EditCompanyUserPassword';
import EditCompanyUser from 'components/companyAdmin/userManagement/shared/editCompanyUser/presentational/EditCompanyUser';
import ClientsAccessContainer from 'components/shared/clients/containers/ClientsAccessContainer';

const UserManagementRoutes = ({ base = '/company/users-management' }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${base}/company-admins`}
            component={AllCompanyAdminsContainer}
        />
        <Route
            exact
            path={`${base}/operatives`}
            component={AllOperativesContainer}
        />
        <Route
            exact
            path={`${base}/company-admins/create`}
            component={CreateCompanyAdmin}
        />
        <Route
            exact
            path={`${base}/operatives/create`}
            component={CreateOperative}
        />
        <Route
            exact
            path={`${base}/operatives/:id/edit-password`}
            component={EditCompanyUserPassword}
        />
        <Route
            exact
            path={`${base}/company-admins/:id/edit-password`}
            component={EditCompanyUser}
        />
        <Route
            exact
            path={`${base}/client-access`}
            component={ClientsAccessContainer}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
