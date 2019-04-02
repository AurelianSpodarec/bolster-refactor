import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import SingleDrawingContainer from 'components/companyAdmin/drawings/singleDrawing/containers/SingleDrawingContainer';
import AddDrawing from 'components/companyAdmin/drawings/addDrawing/presentational/AddDrawing';
import AttachDrawingOperative from 'components/companyAdmin/drawings/attachDrawingOperative/presentational/AttachDrawingOperative';
import InviteClientToDrawing from 'components/companyAdmin/drawings/inviteClientToDrawing/presentational/InviteClientToDrawing';
import AttachDrawingDocument from 'components/companyAdmin/drawings/attachDrawingDocument/presentational/AttachDrawingDocument';
import InviteCompanyToBuilding from 'components/companyAdmin/buildings/inviteCompanyToBuilding/presentational/InviteCompanyToBuilding';

const DrawingsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/:id`}
            component={SingleDrawingContainer}
        />
        <Route
            exact
            path={`${baseUrl}/create/:floorID`}
            component={AddDrawing}
        />
        <Route
            exact
            path={`${baseUrl}/:id/attach-operative`}
            component={AttachDrawingOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-client`}
            component={InviteClientToDrawing}
        />
        <Route
            exact
            path={`${baseUrl}/:id/attach-document`}
            component={AttachDrawingDocument}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-company`}
            component={InviteCompanyToBuilding}
        />
    </SwitchWith404>
);

export default DrawingsRoutes;
