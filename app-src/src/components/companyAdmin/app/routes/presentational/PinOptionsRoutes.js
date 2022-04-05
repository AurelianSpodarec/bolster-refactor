import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';

import PinOptions from 'components/companyAdmin/pinOptions/PinOptions';
import InstallationTypes from 'components/companyAdmin/pinOptions/installationTypes/InstallationTypes';
import ItemTypes from 'components/companyAdmin/pinOptions/itemTypes/ItemTypes';

const PinOptionsRoutes = ({ base = '/company/pin-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={PinOptions} />
        <Route exact path={`${base}/installation-types/:id`} component={InstallationTypes} />
        <Route exact path={`${base}/item-types/:id`} component={ItemTypes} />
    </SwitchWith404>
);

export default PinOptionsRoutes;
