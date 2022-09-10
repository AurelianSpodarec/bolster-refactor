import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import SinglePinContainer from 'pages/dashboard/client/pins/singlePin/containers/SinglePinContainer';

const PinRoutes = ({ base = '/client/pins' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SinglePinContainer} />
    </SwitchWith404>
);

export default PinRoutes;
