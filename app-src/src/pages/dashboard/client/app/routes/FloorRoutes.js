import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import SingleFloorContainer from 'pages/dashboard/client/floors/singleFloor/containers/SingleFloorContainer';

const FloorRoutes = ({ base = '/client/floors' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleFloorContainer} />
    </SwitchWith404>
);

export default FloorRoutes;
