import React from 'react';
import { Route } from 'react-router-dom';
import SwitchWith404 from './SwitchWith404';
import AddService from 'components/services/addService/presentational/AddService';

const ServicesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AddService} />
    </SwitchWith404>
);

export default ServicesRoutes;
