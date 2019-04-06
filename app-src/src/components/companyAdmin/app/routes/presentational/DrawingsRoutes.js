import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SingleDrawingContainer from 'components/companyAdmin/drawings/singleDrawing/containers/SingleDrawingContainer';
import AddDrawing from 'components/companyAdmin/drawings/addDrawing/presentational/AddDrawing';
import AttachDrawingOperative from 'components/companyAdmin/drawings/attachDrawingOperative/presentational/AttachDrawingOperative';
import InviteClientToDrawing from 'components/companyAdmin/drawings/inviteClientToDrawing/presentational/InviteClientToDrawing';
import ClientEditContainer from 'components/shared/clients/containers/ClientEditContainer';

import AttachDrawingDocument from 'components/companyAdmin/drawings/attachDrawingDocument/presentational/AttachDrawingDocument';
import InviteCompanyToDrawing from 'components/companyAdmin/drawings/inviteCompanyToDrawing/presentational/InviteCompanyToDrawing';
import EditDrawingDocument from 'components/companyAdmin/drawings/editDrawingDocument/presentational/EditDrawingDocument';
import EditDrawingOperativeFormContainer from 'components/companyAdmin/drawings/editDrawingOperative/containers/EditDrawingOperativeFormContainer';

const DrawingsRoutes = ({ base = '/company/drawings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleDrawingContainer} />
        <Route exact path={`${base}/create/:id`} component={AddDrawing} />
        <Route
            exact
            path={`${base}/:id/add-operative`}
            component={AttachDrawingOperative}
        />
        <Route
            exact
            path={`${base}/:id/edit-operative/:operativeID`}
            component={EditDrawingOperativeFormContainer}
        />
        <Route
            exact
            path={`${base}/:id/client/:clientID/edit`}
            component={ClientEditContainer}
        />
        <Route
            exact
            path={`${base}/:id/invite-client`}
            component={InviteClientToDrawing}
        />
        <Route
            exact
            path={`${base}/:id/attach-document`}
            component={AttachDrawingDocument}
        />
        <Route
            exact
            path={`${base}/:id/edit-document/:documentID`}
            component={EditDrawingDocument}
        />
        <Route
            exact
            path={`${base}/:id/invite-company`}
            component={InviteCompanyToDrawing}
        />
    </SwitchWith404>
);

export default DrawingsRoutes;
