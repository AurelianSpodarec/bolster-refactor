import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import PinOptions from 'components/companyAdmin/pinOptions/PinOptions';

const PinOptionsRoutes = ({ base = '/company/pin-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={PinOptions} />
    </SwitchWith404>
);

export default PinOptionsRoutes;
