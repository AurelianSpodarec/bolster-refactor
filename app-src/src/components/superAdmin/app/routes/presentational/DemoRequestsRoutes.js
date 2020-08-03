import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import DemoRequestsContainer from 'components/superAdmin/demoRequests/containers/DemoRequestsContainer';
import SingleDemoRequestContainer from 'components/superAdmin/demoRequests/singleDemoRequest/containers/SingleDemoRequestContainer';

const DemoRequestsRoutes = ({ base = '/admin/demo-requests' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={DemoRequestsContainer} />
        <Route path={`${base}/:id`} component={SingleDemoRequestContainer} />
    </SwitchWith404>
);

export default DemoRequestsRoutes;
