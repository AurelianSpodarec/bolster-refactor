import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import SingleFloor from 'components/floors/singleFloor/presentational/SingleFloor';
import AttachFloorOperative from 'components/floors/attachFloorOperative/presentational/AttachFloorOperative';
import InviteClientToFloor from 'components/floors/inviteClientToFloor/presentational/InviteClientToFloor';
import AttachFloorDocument from 'components/floors/attachFloorDocument/presentational/AttachFloorDocument';
import InviteCompanyToFloor from 'components/floors/inviteCompanyToFloor/presentational/InviteCompanyToFloor';

const FloorRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={SingleFloor} />
        <Route
            exact
            path={`${baseUrl}/:siteId/attach-operative`}
            component={AttachFloorOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/invite-client`}
            component={InviteClientToFloor}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/attach-document`}
            component={AttachFloorDocument}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/invite-company`}
            component={InviteCompanyToFloor}
        />
    </SwitchWith404>
);

export default FloorRoutes;
