import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import Building from 'components/buildings/building/presentational/Building';
import AttachBuildingOperative from 'components/buildings/attachBuildingOperative/presentational/AttachBuildingOperative';
import InviteClientToBuilding from 'components/buildings/inviteClientToBuilding/presentational/InviteClientToBuilding';
import AttachBuildingDocument from 'components/buildings/attachBuildingDocument/presentational/AttachBuildingDocument';
import InviteCompanyToBuilding from 'components/buildings/inviteCompanyToBuilding/presentational/InviteCompanyToBuilding';

const BuildingRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={Building} />
        <Route
            exact
            path={`${baseUrl}/:siteId/attach-operative`}
            component={AttachBuildingOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/invite-client`}
            component={InviteClientToBuilding}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/attach-document`}
            component={AttachBuildingDocument}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/invite-company`}
            component={InviteCompanyToBuilding}
        />
    </SwitchWith404>
);

export default BuildingRoutes;
