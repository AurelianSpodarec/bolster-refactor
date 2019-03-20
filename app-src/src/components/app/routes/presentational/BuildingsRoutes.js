import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import SingleBuilding from 'components/buildings/singleBuilding/presentational/SingleBuilding';
import AttachBuildingOperative from 'components/buildings/attachBuildingOperative/presentational/AttachBuildingOperative';
import InviteClientToBuilding from 'components/buildings/inviteClientToBuilding/presentational/InviteClientToBuilding';
import AttachBuildingDocument from 'components/buildings/attachBuildingDocument/presentational/AttachBuildingDocument';
import InviteCompanyToBuilding from 'components/buildings/inviteCompanyToBuilding/presentational/InviteCompanyToBuilding';
import CreateBuilding from 'components/buildings/createBuilding/presentational/CreateBuilding';

const BuildingRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={SingleBuilding} />
        <Route
            exact
            path={`${baseUrl}/create/:siteID`}
            component={CreateBuilding}
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
            path={`${baseUrl}/:id/attach-document`}
            component={AttachBuildingDocument}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-company`}
            component={InviteCompanyToBuilding}
        />
    </SwitchWith404>
);

export default BuildingRoutes;
