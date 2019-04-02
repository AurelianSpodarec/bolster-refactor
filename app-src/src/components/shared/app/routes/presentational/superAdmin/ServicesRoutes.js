import React from 'react';
import { Route } from 'react-router-dom';
import SwitchWith404 from '../SwitchWith404';
import AddService from 'components/superAdmin/services/addService/presentational/AddService';
import AllServicesContainer from 'components/superAdmin/services/shared/containers/AllServicesContainer';

const ServicesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllServicesContainer} />
        <Route exact path={`${baseUrl}/create`} component={AddService} />
    </SwitchWith404>
);

export default ServicesRoutes;
