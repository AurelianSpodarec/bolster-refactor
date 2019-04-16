import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SingleFloorContainer from 'components/companyAdmin/floors/singleFloor/containers/SingleFloorContainer';
import AttachFloorOperative from 'components/companyAdmin/floors/attachFloorOperative/presentational/AttachFloorOperative';
import InviteClientToFloor from 'components/companyAdmin/floors/inviteClientToFloor/presentational/InviteClientToFloor';
import InviteCompanyToFloor from 'components/companyAdmin/floors/inviteCompanyToFloor/presentational/InviteCompanyToFloor';
import AddFloor from 'components/companyAdmin/floors/addFloor/presentational/AddFloor';
import FloorInviteClientContainer from 'components/companyAdmin/floors/singleFloor/containers/FloorInviteClientContainer';
import FloorEditContainer from 'components/companyAdmin/floors/singleFloor/containers/FloorEditContainer';
import AttachFloorDocument from 'components/companyAdmin/floors/attachFloorDocument/presentational/AttachFloorDocument';
import EditFloorDocument from 'components/companyAdmin/floors/editFloorDocument/presentational/EditFloorDocument';
import EditCompanyPermissionsOnFloorFormContainer from 'components/companyAdmin/floors/editCompanyOnFloor/containers/EditCompanyPermissionsOnFloorFormContainer';
import AddCompanyPermissionsToFloor from 'components/companyAdmin/floors/addCompanyPermissionsToFloor/presentational/AddCompanyPermissionsToFloor';

const FloorRoutes = ({ base = '/company/floors' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleFloorContainer} />
        <Route exact path={`${base}/create/:id`} component={AddFloor} />
        <Route exact path={`${base}/:id/edit`} component={FloorEditContainer} />
        <Route
            exact
            path={`${base}/:id/add-operative`}
            component={AttachFloorOperative}
        />
        <Route
            exact
            path={`${base}/:id/invite-client`}
            component={InviteClientToFloor}
        />
        <Route
            exact
            path={`${base}/:id/attach-document`}
            component={AttachFloorDocument}
        />
        <Route
            exact
            path={`${base}/:id/edit-document/:documentID`}
            component={EditFloorDocument}
        />
        <Route
            exact
            path={`${base}/:id/client-access`}
            component={FloorInviteClientContainer}
        />
        <Route
            exact
            path={`${base}/:id/invite-company`}
            component={InviteCompanyToFloor}
        />
        <Route
            exact
            path={`${base}/:id/add-permissions/:companyID`}
            component={AddCompanyPermissionsToFloor}
        />
        <Route
            exact
            path={`${base}/:id/edit-company/:companyID`}
            component={EditCompanyPermissionsOnFloorFormContainer}
        />
    </SwitchWith404>
);

export default FloorRoutes;
