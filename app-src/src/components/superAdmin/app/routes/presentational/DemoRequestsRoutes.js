import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import DemoRequestsContainer from 'components/superAdmin/demoRequests/containers/DemoRequestsContainer';

const DemoRequestsRoutes = ({ base = '/admin/demo-requests' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={DemoRequestsContainer} />
    </SwitchWith404>
);

export default DemoRequestsRoutes;
