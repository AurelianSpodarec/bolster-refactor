import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllCompanyAdminsContainer from 'components/companyAdmin/userManagement/companyAdmins/allCompanyAdmins/containers/AllCompanyAdminsContainer';
import AllOperatives from 'components/companyAdmin/userManagement/operatives/allOperatives/presentational/AllOperatives';
import AllClientsContainer from 'components/companyAdmin/userManagement/clients/allClients/containers/AllClientsContainer';
import ClientsAccessContainer from 'components/shared/clients/containers/ClientsAccessContainer';
import CreateOperative from 'components/companyAdmin/userManagement/operatives/createOperative/presentational/CreateOperative';
import CreateCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdmin';
import EditOperativeContainer from 'components/companyAdmin/userManagement/operatives/editOperative/containers/EditOperativeContainer';
import UserDrawingsContainer from 'components/companyAdmin/userManagement/userDrawings/containers/UserDrawingsContainer';
import EditCompanyAdmin from 'components/companyAdmin/userManagement/companyAdmins/editCompanyAdmin/presentational/EditCompanyAdmin';
import EditClientContainer from 'components/companyAdmin/userManagement/clients/singleClient/containers/EditClientContainer';
import SingleClientContainer from 'components/companyAdmin/userManagement/clients/singleClient/containers/SingleClientContainer';
import AddClientContainer from 'components/companyAdmin/userManagement/clients/singleClient/containers/AddClientContainer';
import EditCompanyUserEmail from 'components/companyAdmin/userManagement/shared/editCompanyUserEmail/EditCompanyUserEmail';
import EditClientUserEmail from 'components/companyAdmin/userManagement/clients/singleClient/EditClientUserEmail';
import DocumentsUploaderContainer from 'components/companyAdmin/userManagement/documentsUploader/containers/DocumentsUploaderContainer';
// import EditOperativePasswordContainer from 'components/companyAdmin/userManagement/operatives/editOperativePassword/containers/EditOperativePasswordContainer';

const UserManagementRoutes = ({ base = '/company/users-management' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/company-admins`} component={AllCompanyAdminsContainer} />
        <Route exact path={`${base}/operatives`} component={AllOperatives} />
        <Route exact path={`${base}/clients`} component={AllClientsContainer} />
        <Route exact path={`${base}/clients/create`} component={AddClientContainer} />
        <Route exact path={`${base}/clients/:id`} component={SingleClientContainer} />
        <Route exact path={`${base}/clients/:id/edit`} component={EditClientContainer} />
        <Route exact path={`${base}/clients/:id/edit-email`} component={EditClientUserEmail} />
        <Route exact path={`${base}/company-admins/create`} component={CreateCompanyAdmin} />
        <Route exact path={`${base}/company-admins/:id/edit`} component={EditCompanyAdmin} />
        <Route
            exact
            path={`${base}/company-admins/:id/edit-email`}
            component={EditCompanyUserEmail}
        />
        <Route exact path={`${base}/operatives/create`} component={CreateOperative} />
        <Route exact path={`${base}/operatives/:id/edit`} component={EditOperativeContainer} />
        <Route exact path={`${base}/operatives/:id/edit-email`} component={EditCompanyUserEmail} />
        <Route exact path={`${base}/operative/:id/drawings`} component={UserDrawingsContainer} />
        <Route exact path={`${base}/client-access`} component={ClientsAccessContainer} />
        <Route
            exact
            path={`${base}/company-admins/:id/documents`}
            component={DocumentsUploaderContainer}
        />
        <Route
            exact
            path={`${base}/operatives/:id/documents`}
            component={DocumentsUploaderContainer}
        />
        {/* <Route
            exact
            path={`${base}/operatives/:id/edit-password`}
            component={EditOperativePasswordContainer}
        /> */}
        {/* <Route
            exact
            path={`${base}/company-admins/:id/edit-password`}
            component={EditCompanyAdminPasswordContainer}
        /> */}
        <Route exact path={`${base}/client-access`} component={ClientsAccessContainer} />
        <Route
            exact
            path={`${base}/company-admins/:id/drawings`}
            component={UserDrawingsContainer}
        />
        <Route exact path={`${base}/operative/:id/drawings`} component={UserDrawingsContainer} />
    </SwitchWith404>
);

export default UserManagementRoutes;
