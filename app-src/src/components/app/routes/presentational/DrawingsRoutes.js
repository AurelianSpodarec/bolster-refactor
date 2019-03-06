import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import SingleDrawingContainer from 'components/drawings/singleDrawing/containers/SingleDrawingContainer';
import AttachDrawingOperative from 'components/drawings/attachDrawingOperative/presentational/AttachDrawingOperative';
import InviteClientToDrawing from 'components/drawings/inviteClientToDrawing/presentational/InviteClientToDrawing';
import AttachDrawingDocument from 'components/drawings/attachDrawingDocument/presentational/AttachDrawingDocument';

const DrawingsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/:id`}
            component={SingleDrawingContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/attach-operative`}
            component={AttachDrawingOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/invite-client`}
            component={InviteClientToDrawing}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/attach-document`}
            component={AttachDrawingDocument}
        />
    </SwitchWith404>
);

export default DrawingsRoutes;
