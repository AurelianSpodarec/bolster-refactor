import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import SingleFloorContainer from 'components/companyAdmin/floors/singleFloor/containers/SingleFloorContainer';
import AttachFloorOperative from 'components/companyAdmin/floors/attachFloorOperative/presentational/AttachFloorOperative';
import InviteClientToFloor from 'components/companyAdmin/floors/inviteClientToFloor/presentational/InviteClientToFloor';
import InviteCompanyToFloor from 'components/companyAdmin/floors/inviteCompanyToFloor/presentational/InviteCompanyToFloor';
import AddFloor from 'components/companyAdmin/floors/addFloor/presentational/AddFloor';
import FloorInviteClientContainer from 'components/companyAdmin/floors/singleFloor/containers/FloorInviteClientContainer';
import FloorEditContainer from 'components/companyAdmin/floors/singleFloor/containers/FloorEditContainer';
import AttachFloorDocument from 'components/companyAdmin/floors/attachFloorDocument/presentational/AttachFloorDocument';
import EditFloorDocument from 'components/companyAdmin/floors/editFloorDocument/presentational/EditFloorDocument';

const FloorRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={SingleFloorContainer} />
        <Route exact path={`${baseUrl}/create/:id`} component={AddFloor} />
        <Route
            exact
            path={`${baseUrl}/edit/:id`}
            component={FloorEditContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:id/add-operative`}
            component={AttachFloorOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-client`}
            component={InviteClientToFloor}
        />
        <Route
            exact
            path={`${baseUrl}/:id/attach-document`}
            component={AttachFloorDocument}
        />
        <Route
            exact
            path={`${baseUrl}/:id/edit-document/:documentID`}
            component={EditFloorDocument}
        />
        <Route
            exact
            path={`${baseUrl}/:id/client-access`}
            component={FloorInviteClientContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:id/invite-company`}
            component={InviteCompanyToFloor}
        />
    </SwitchWith404>
);

export default FloorRoutes;
