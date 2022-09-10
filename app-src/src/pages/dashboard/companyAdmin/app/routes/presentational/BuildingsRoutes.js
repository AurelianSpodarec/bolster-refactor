import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import SingleBuildingContainer from 'pages/dashboard/companyAdmin/buildings/singleBuilding/containers/SingleBuildingContainer';
import AttachBuildingOperative from 'pages/dashboard/companyAdmin/buildings/attachBuildingOperative/presentational/AttachBuildingOperative';
import InviteClientToBuilding from 'pages/dashboard/companyAdmin/buildings/inviteClientToBuilding/presentational/InviteClientToBuilding';
import InviteCompanyToBuilding from 'pages/dashboard/companyAdmin/buildings/inviteCompanyToBuilding/presentational/InviteCompanyToBuilding';
import BuildingClientAccessContainer from 'pages/dashboard/companyAdmin/buildings/singleBuilding/containers/BuildingClientAccessContainer';
import AttachBuildingDocument from 'pages/dashboard/companyAdmin/buildings/attachBuildingDocument/presentational/AttachBuildingDocument';
import EditBuildingDocument from 'pages/dashboard/companyAdmin/buildings/editBuildingDocument/presentational/EditBuildingDocument';
import EditCompanyPermissionsOnBuildingContainer from 'pages/dashboard/companyAdmin/buildings/editCompanyOnBuilding/containers/EditCompanyPermissionsOnBuildingContainer';
import AddCompanyPermissionsToBuilding from 'pages/dashboard/companyAdmin/buildings/addCompanyPermissionsToBuilding.js/presentational/AddCompanyPermissionsToBuilding';
import DocumentResponsesContainer from 'components_DEPRECATED/shared/documents/containers/DocumentResponsesContainer';
import HierarchyAlerts from 'pages/dashboard/companyAdmin/upcomingAlerts/hierarchys/HierarchyAlerts';

const BuildingRoutes = ({ base = '/company/buildings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleBuildingContainer} />
        <Route exact path={`${base}/:id/add-operative`} component={AttachBuildingOperative} />
        <Route exact path={`${base}/:id/invite-client`} component={InviteClientToBuilding} />

        <Route exact path={`${base}/:id/client-access`} component={BuildingClientAccessContainer} />
        <Route exact path={`${base}/:id/attach-document`} component={AttachBuildingDocument} />
        <Route
            exact
            path={`${base}/:id/edit-document/:documentID`}
            component={EditBuildingDocument}
        />
        <Route
            exact
            path={`${base}/:id/document-responses/:documentID`}
            component={DocumentResponsesContainer}
        />
        <Route exact path={`${base}/:id/invite-company`} component={InviteCompanyToBuilding} />
        <Route
            exact
            path={`${base}/:id/add-permissions/:companyID`}
            component={AddCompanyPermissionsToBuilding}
        />
        <Route
            exact
            path={`${base}/:id/edit-company/:companyID`}
            component={EditCompanyPermissionsOnBuildingContainer}
        />
        <Route exact path={`${base}/:id/upcoming-alerts`} component={HierarchyAlerts} />
    </SwitchWith404>
);

export default BuildingRoutes;
