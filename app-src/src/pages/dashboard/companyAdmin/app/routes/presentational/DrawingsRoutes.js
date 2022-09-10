import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import SingleDrawingContainer from 'pages/dashboard/companyAdmin/drawings/singleDrawing/containers/SingleDrawingContainer';
import AttachDrawingOperative from 'pages/dashboard/companyAdmin/drawings/attachDrawingOperative/presentational/AttachDrawingOperative';
import InviteClientToDrawing from 'pages/dashboard/companyAdmin/drawings/inviteClientToDrawing/presentational/InviteClientToDrawing';
import ClientEditContainer from 'components_DEPRECATED/shared/clients/containers/ClientEditContainer';

import AttachDrawingDocument from 'pages/dashboard/companyAdmin/drawings/attachDrawingDocument/presentational/AttachDrawingDocument';
import InviteCompanyToDrawing from 'pages/dashboard/companyAdmin/drawings/inviteCompanyToDrawing/presentational/InviteCompanyToDrawing';
import EditDrawingDocument from 'pages/dashboard/companyAdmin/drawings/editDrawingDocument/presentational/EditDrawingDocument';
import EditDrawingOperativeFormContainer from 'pages/dashboard/companyAdmin/drawings/editDrawingOperative/containers/EditDrawingOperativeFormContainer';
import EditCompanyPermissionsOnDrawingContainer from 'pages/dashboard/companyAdmin/drawings/editCompanyOnDrawing/containers/EditCompanyPermissionsOnDrawingContainer';

import AddPin from 'pages/dashboard/companyAdmin/pins/addPin/presentational/AddPin';
import AddCompanyPermissionsToDrawing from 'pages/dashboard/companyAdmin/drawings/addCompanyPermissionsToDrawing/presentational/AddCompanyPermissionsToDrawing';
import DocumentResponsesContainer from 'components_DEPRECATED/shared/documents/containers/DocumentResponsesContainer';
import HierarchyAlerts from 'pages/dashboard/companyAdmin/upcomingAlerts/hierarchys/HierarchyAlerts';

const DrawingsRoutes = ({ base = '/company/drawings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleDrawingContainer} />
        <Route exact path={`${base}/:id/add-operative`} component={AttachDrawingOperative} />
        <Route
            exact
            path={`${base}/:id/edit-operative/:operativeID`}
            component={EditDrawingOperativeFormContainer}
        />
        <Route exact path={`${base}/:id/edit-client/:clientID`} component={ClientEditContainer} />
        <Route exact path={`${base}/:id/invite-client`} component={InviteClientToDrawing} />
        <Route exact path={`${base}/:id/attach-document`} component={AttachDrawingDocument} />
        <Route
            exact
            path={`${base}/:id/edit-document/:documentID`}
            component={EditDrawingDocument}
        />
        <Route
            exact
            path={`${base}/:id/document-responses/:documentID`}
            component={DocumentResponsesContainer}
        />
        <Route exact path={`${base}/:id/invite-company`} component={InviteCompanyToDrawing} />
        <Route
            exact
            path={`${base}/:id/add-permissions/:companyID`}
            component={AddCompanyPermissionsToDrawing}
        />
        <Route
            exact
            path={`${base}/:id/edit-company/:companyID`}
            component={EditCompanyPermissionsOnDrawingContainer}
        />
        <Route exact path={`${base}/:id/add-pin`} component={AddPin} />
        <Route exact path={`${base}/:id/upcoming-alerts`} component={HierarchyAlerts} />
    </SwitchWith404>
);

export default DrawingsRoutes;
