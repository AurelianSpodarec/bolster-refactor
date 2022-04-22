import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SuperAdminPinOptions from '../../../pinOptions/PinOptions';

const PinOptionsRoutes = ({ base = '/admin/pin-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={SuperAdminPinOptions} />
    </SwitchWith404>
);

export default PinOptionsRoutes;
