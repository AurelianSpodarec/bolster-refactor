import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import SingleFloorContainer from 'pages/dashboard/companyAdmin/floors/singleFloor/containers/SingleFloorContainer';
import AttachFloorOperative from 'pages/dashboard/companyAdmin/floors/attachFloorOperative/presentational/AttachFloorOperative';
import InviteClientToFloor from 'pages/dashboard/companyAdmin/floors/inviteClientToFloor/presentational/InviteClientToFloor';
import InviteCompanyToFloor from 'pages/dashboard/companyAdmin/floors/inviteCompanyToFloor/presentational/InviteCompanyToFloor';
import FloorInviteClientContainer from 'pages/dashboard/companyAdmin/floors/singleFloor/containers/FloorInviteClientContainer';
import AttachFloorDocument from 'pages/dashboard/companyAdmin/floors/attachFloorDocument/presentational/AttachFloorDocument';
import EditFloorDocument from 'pages/dashboard/companyAdmin/floors/editFloorDocument/presentational/EditFloorDocument';
import EditCompanyPermissionsOnFloorContainer from 'pages/dashboard/companyAdmin/floors/editCompanyOnFloor/containers/EditCompanyPermissionsOnFloorContainer';
import AddCompanyPermissionsToFloor from 'pages/dashboard/companyAdmin/floors/addCompanyPermissionsToFloor/presentational/AddCompanyPermissionsToFloor';
import DocumentResponsesContainer from 'components_DEPRECATED/shared/documents/containers/DocumentResponsesContainer';
import HierarchyAlerts from 'pages/dashboard/companyAdmin/upcomingAlerts/hierarchys/HierarchyAlerts';

const FloorRoutes = ({ base = '/company/floors' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleFloorContainer} />
        <Route exact path={`${base}/:id/add-operative`} component={AttachFloorOperative} />
        <Route exact path={`${base}/:id/invite-client`} component={InviteClientToFloor} />
        <Route exact path={`${base}/:id/attach-document`} component={AttachFloorDocument} />
        <Route exact path={`${base}/:id/edit-document/:documentID`} component={EditFloorDocument} />
        <Route
            exact
            path={`${base}/:id/document-responses/:documentID`}
            component={DocumentResponsesContainer}
        />
        <Route exact path={`${base}/:id/client-access`} component={FloorInviteClientContainer} />
        <Route exact path={`${base}/:id/invite-company`} component={InviteCompanyToFloor} />
        <Route
            exact
            path={`${base}/:id/add-permissions/:companyID`}
            component={AddCompanyPermissionsToFloor}
        />
        <Route
            exact
            path={`${base}/:id/edit-company/:companyID`}
            component={EditCompanyPermissionsOnFloorContainer}
        />
        <Route exact path={`${base}/:id/upcoming-alerts`} component={HierarchyAlerts} />
    </SwitchWith404>
);

export default FloorRoutes;
