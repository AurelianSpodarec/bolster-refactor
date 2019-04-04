import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import SingleDrawingContainer from 'components/companyAdmin/drawings/singleDrawing/containers/SingleDrawingContainer';
import AddDrawing from 'components/companyAdmin/drawings/addDrawing/presentational/AddDrawing';
import AttachDrawingOperative from 'components/companyAdmin/drawings/attachDrawingOperative/presentational/AttachDrawingOperative';
import InviteClientToDrawing from 'components/companyAdmin/drawings/inviteClientToDrawing/presentational/InviteClientToDrawing';
import ClientEdit from 'components/shared/clients/presentational/ClientEdit';

import AttachDrawingDocumentFormContainer from 'components/companyAdmin/drawings/attachDrawingDocument/containers/AttachDrawingDocumentFormContainer';
import InviteCompanyToDrawing from 'components/companyAdmin/drawings/inviteCompanyToDrawing/presentational/InviteCompanyToDrawing';
import EditDrawingDocumentContainer from 'components/companyAdmin/drawings/editDrawingDocument/containers/EditDrawingDocumentContainer';

const DrawingsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/:id`}
            component={SingleDrawingContainer}
        />
        <Route exact path={`${baseUrl}/create/:id`} component={AddDrawing} />
        <Route
            exact
            path={`${baseUrl}/:id/add-operative`}
            component={AttachDrawingOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:id/client/:clientID/edit`}
            component={ClientEdit}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-client`}
            component={InviteClientToDrawing}
        />
        <Route
            exact
            path={`${baseUrl}/:id/attach-document`}
            component={AttachDrawingDocumentFormContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:id/documents/:documentID/edit`}
            component={EditDrawingDocumentContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-company`}
            component={InviteCompanyToDrawing}
        />
    </SwitchWith404>
);

export default DrawingsRoutes;
