import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/allCompanyAdmins/containers/AllCompanyAdminsContainer';
import AllOperatives from 'components/companyAdmin/userManagement/operatives/allOperatives/presentational/AllOperatives';
import AllClientsContainer from 'components/companyAdmin/userManagement/clients/allClients/containers/AllClientsContainer';
import ClientsAccessContainer from 'components/shared/clients/containers/ClientsAccessContainer';
import CreateOperative from 'components/companyAdmin/userManagement/operatives/createOperative/presentational/CreateOperative';
import CreateCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdmin';
import EditCompanyAdminContainer from 'components/companyAdmin/userManagement/companyAdmins/editCompanyAdmin/containers/EditCompanyAdminContainer';
import EditOperativeContainer from 'components/companyAdmin/userManagement/operatives/editOperative/containers/EditOperativeContainer';
import EditCompanyAdminPasswordContainer from 'components/companyAdmin/userManagement/companyAdmins/editCompanyAdminPassword/containers/EditCompanyAdminPasswordContainer';
import EditOperativePasswordContainer from 'components/companyAdmin/userManagement/operatives/editOperativePassword/containers/EditOperativePasswordContainer';
import UserDrawingsContainer from 'components/companyAdmin/userManagement/userDrawings/containers/UserDrawingsContainer';

const UserManagementRoutes = ({ base = '/company/users-management' }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${base}/company-admins`}
            component={AllCompanyAdminsContainer}
        />
        <Route exact path={`${base}/operatives`} component={AllOperatives} />
        <Route exact path={`${base}/clients`} component={AllClientsContainer} />
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
        <Route
            exact
            path={`${base}/operative/:id/drawings`}
            component={UserDrawingsContainer}
        />
        <Route
            exact
            path={`${base}/company-admins/:id/drawings`}
            component={UserDrawingsContainer}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
