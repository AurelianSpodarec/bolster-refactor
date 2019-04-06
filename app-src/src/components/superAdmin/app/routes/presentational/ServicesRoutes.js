import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AddService from 'components/superAdmin/services/addService/presentational/AddService';
import AllServicesContainer from 'components/superAdmin/services/shared/containers/AllServicesContainer';

const ServicesRoutes = ({ base = '/admin/services' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllServicesContainer} />
        <Route exact path={`${base}/create`} component={AddService} />
    </SwitchWith404>
);

export default ServicesRoutes;
