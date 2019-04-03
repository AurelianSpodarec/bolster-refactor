import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import SingleBuildingContainer from 'components/companyAdmin/buildings/singleBuilding/containers/SingleBuildingContainer';
import AttachBuildingOperative from 'components/companyAdmin/buildings/attachBuildingOperative/presentational/AttachBuildingOperative';
import InviteClientToBuilding from 'components/companyAdmin/buildings/inviteClientToBuilding/presentational/InviteClientToBuilding';
import InviteCompanyToBuilding from 'components/companyAdmin/buildings/inviteCompanyToBuilding/presentational/InviteCompanyToBuilding';
import CreateBuilding from 'components/companyAdmin/buildings/createBuilding/presentational/CreateBuilding';
import BuildingClientAccessContainer from 'components/companyAdmin/buildings/singleBuilding/containers/BuildingClientAccessContainer';
import BuildingEditContainer from 'components/companyAdmin/buildings/singleBuilding/containers/BuildingEditContainer';
import AttachBuildingDocumentFormContainer from 'components/companyAdmin/buildings/attachBuildingDocument/containers/AttachBuildingDocumentFormContainer';

const BuildingRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/:id`}
            component={SingleBuildingContainer}
        />
        <Route
            exact
            path={`${baseUrl}/create/:id`}
            component={CreateBuilding}
        />
        <Route
            exact
            path={`${baseUrl}/edit/:id`}
            component={BuildingEditContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:id/attach-operative`}
            component={AttachBuildingOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-client`}
            component={InviteClientToBuilding}
        />

        <Route
            exact
            path={`${baseUrl}/:id/client-access`}
            component={BuildingClientAccessContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:id/attach-document`}
            component={AttachBuildingDocumentFormContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-company`}
            component={InviteCompanyToBuilding}
        />
    </SwitchWith404>
);

export default BuildingRoutes;
