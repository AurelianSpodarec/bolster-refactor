import React from 'react';
import { Route } from 'react-router-dom';

import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/allCompanyAdmins/containers/AllCompanyAdminsContainer';

import SwitchWith404 from '../SwitchWith404';
import AllOperativesContainer from 'components/companyAdmin/userManagement/operatives/allOperatives/containers/AllOperativesContainer';
import CreateOperative from 'components/companyAdmin/userManagement/operatives/createOperative/presentational/CreateOperative';
import CreateCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdmin';
import EditOperativeFormContainer from 'components/companyAdmin/userManagement/operatives/editOperative/containers/EditOperativeFormContainer';
import EditCompanyAdminFormContainer from 'components/companyAdmin/userManagement/companyAdmins/editCompanyAdmin/containers/EditCompanyAdminFormContainer';

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
            component={EditOperativeFormContainer}
        />
        <Route
            exact
            path={`${baseUrl}/company-admins/:id/edit`}
            component={EditCompanyAdminFormContainer}
        />
    </SwitchWith404>
);

export default UserManagementRoutes;
