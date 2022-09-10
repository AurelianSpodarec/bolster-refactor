import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import MoveTool from 'pages/dashboard/superAdmin/siteManagement/moveTool/presentational/MoveTool';

const MoveToolRoutes = ({ base = '/admin/move-tool' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={MoveTool} />
    </SwitchWith404>
);

export default MoveToolRoutes;
