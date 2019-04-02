import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import SingleFloorContainer from 'components/floors/singleFloor/containers/SingleFloorContainer';
import AttachFloorOperative from 'components/floors/attachFloorOperative/presentational/AttachFloorOperative';
import InviteClientToFloor from 'components/floors/inviteClientToFloor/presentational/InviteClientToFloor';
import AttachFloorDocument from 'components/floors/attachFloorDocument/presentational/AttachFloorDocument';
import InviteCompanyToFloor from 'components/floors/inviteCompanyToFloor/presentational/InviteCompanyToFloor';
import AddFloor from 'components/floors/addFloor/presentational/AddFloor';
import FloorInviteClientContainer from 'components/floors/singleFloor/containers/FloorInviteClientContainer';
import FloorEditContainer from 'components/floors/singleFloor/containers/FloorEditContainer';

const FloorRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={SingleFloorContainer} />
        <Route
            exact
            path={`${baseUrl}/create/:buildingID`}
            component={AddFloor}
        />
        <Route
            exact
            path={`${baseUrl}/edit/:id`}
            component={FloorEditContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:id/attach-operative`}
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
