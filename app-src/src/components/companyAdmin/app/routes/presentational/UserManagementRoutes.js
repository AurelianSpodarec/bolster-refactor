import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/allCompanyAdmins/containers/AllCompanyAdminsContainer';
import AllOperativesContainer from 'components/companyAdmin/userManagement/operatives/allOperatives/containers/AllOperativesContainer';
import CreateOperative from 'components/companyAdmin/userManagement/operatives/createOperative/presentational/CreateOperative';
import CreateCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdmin';
import EditCompanyAdminContainer from 'components/companyAdmin/userManagement/companyAdmins/editCompanyAdmin/containers/EditCompanyAdminContainer';
import EditOperativeContainer from 'components/companyAdmin/userManagement/operatives/editOperative/containers/EditOperativeContainer';
import EditCompanyAdminPasswordContainer from 'components/companyAdmin/userManagement/companyAdmins/editCompanyAdminPassword/containers/EditCompanyAdminPasswordContainer';
import EditOperativePasswordContainer from 'components/companyAdmin/userManagement/operatives/editOperativePassword/containers/EditOperativePasswordContainer';

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
            path={`${base}/company-admins/:id/edit`}
            component={EditCompanyAdminContainer}
        />
        <Route
            exact
            path={`${base}/operatives/:id/edit`}
            component={EditOperativeContainer}
        />
        <Route
            exact
            path={`${base}/operatives/:id/edit-password`}
            component={EditOperativePasswordContainer}
        />
        <Route
            exact
            path={`${base}/company-admins/:id/edit-password`}
            component={EditCompanyAdminPasswordContainer}
        />
        <Route
            exact
            path={`${base}/client-access`}
            component={ClientsAccessContainer}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
