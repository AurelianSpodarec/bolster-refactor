import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import PinOptionsManufacturersContainer from 'components/superAdmin/pinOptions/allPinOptionsManufacturers/containers/PinOptionsManufacturersContainer';
import SingleManufacturerContainer from 'components/superAdmin/pinOptions/singleManufacturer/containers/SingleManufacturerContainer';

const PinOptionsManufacturersRoutes = ({ base = '/admin/pin-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:type`} component={PinOptionsManufacturersContainer} />
        <Route exact path={`${base}/:type/:id`} component={SingleManufacturerContainer} />
    </SwitchWith404>
);

export default PinOptionsManufacturersRoutes;
