import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SingleBuildingContainer from 'components/companyAdmin/buildings/singleBuilding/containers/SingleBuildingContainer';
import AttachBuildingOperative from 'components/companyAdmin/buildings/attachBuildingOperative/presentational/AttachBuildingOperative';
import InviteClientToBuilding from 'components/companyAdmin/buildings/inviteClientToBuilding/presentational/InviteClientToBuilding';
import InviteCompanyToBuilding from 'components/companyAdmin/buildings/inviteCompanyToBuilding/presentational/InviteCompanyToBuilding';
import CreateBuilding from 'components/companyAdmin/buildings/createBuilding/presentational/CreateBuilding';
import BuildingClientAccessContainer from 'components/companyAdmin/buildings/singleBuilding/containers/BuildingClientAccessContainer';
import BuildingEditContainer from 'components/companyAdmin/buildings/singleBuilding/containers/BuildingEditContainer';
import AttachBuildingDocument from 'components/companyAdmin/buildings/attachBuildingDocument/presentational/AttachBuildingDocument';
import EditBuildingDocument from 'components/companyAdmin/buildings/editBuildingDocument/presentational/EditBuildingDocument';

const BuildingRoutes = ({ base = '/company/buildings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleBuildingContainer} />
        <Route exact path={`${base}/create/:id`} component={CreateBuilding} />
        <Route
            exact
            path={`${base}/:id/edit`}
            component={BuildingEditContainer}
        />
        <Route
            exact
            path={`${base}/:id/add-operative`}
            component={AttachBuildingOperative}
        />
        <Route
            exact
            path={`${base}/:id/invite-client`}
            component={InviteClientToBuilding}
        />

        <Route
            exact
            path={`${base}/:id/client-access`}
            component={BuildingClientAccessContainer}
        />
        <Route
            exact
            path={`${base}/:id/attach-document`}
            component={AttachBuildingDocument}
        />
        <Route
            exact
            path={`${base}/:id/edit-document/:documentID`}
            component={EditBuildingDocument}
        />
        <Route
            exact
            path={`${base}/:id/invite-company`}
            component={InviteCompanyToBuilding}
        />
    </SwitchWith404>
);

export default BuildingRoutes;
