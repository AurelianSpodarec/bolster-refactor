import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import PinOptionsManufacturerListContainer from 'components/superAdmin/pinOptions/allPinOptionsManufacturers/containers/PinOptionsManufacturerListContainer';

const PinOptionsManufacturersRoutes = ({ base = '/admin/pin-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:type`} component={PinOptionsManufacturerListContainer} />
    </SwitchWith404>
);

export default PinOptionsManufacturersRoutes;
