import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/allCompanyAdmins/containers/AllCompanyAdminsContainer';
import AllOperativesContainer from 'components/companyAdmin/userManagement/operatives/allOperatives/containers/AllOperativesContainer';
import CreateOperative from 'components/companyAdmin/userManagement/operatives/createOperative/presentational/CreateOperative';
import CreateCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdmin';
import EditOperativeFormContainer from 'components/companyAdmin/userManagement/operatives/editOperative/containers/EditOperativeFormContainer';
import EditCompanyAdminFormContainer from 'components/companyAdmin/userManagement/companyAdmins/editCompanyAdmin/containers/EditCompanyAdminFormContainer';
import EditOperativePassword from 'components/companyAdmin/userManagement/operatives/editOperativePassword/presentational/EditOperativePassword';
import editCompanyAdminPassword from 'components/companyAdmin/userManagement/companyAdmins/editCompanyAdminPassword/presentational/editCompanyAdminPassword';

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
            path={`${base}/operatives/:id/edit`}
            component={EditOperativeFormContainer}
        />
        <Route
            exact
            path={`${base}/company-admins/:id/edit`}
            component={EditCompanyAdminFormContainer}
        />
        <Route
            exact
            path={`${base}/operatives/:id/edit-password`}
            component={EditOperativePassword}
        />
        <Route
            exact
            path={`${base}/company-admins/:id/edit-password`}
            component={editCompanyAdminPassword}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
