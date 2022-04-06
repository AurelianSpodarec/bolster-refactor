import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';

import PinOptions from 'components/companyAdmin/pinOptions/PinOptions';
import OptionValues from 'components/companyAdmin/pinOptions/optionValues/OptionValues';

const PinOptionsRoutes = ({ base = '/company/pin-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={PinOptions} />
        <Route exact path={`${base}/:type/:setID`} component={OptionValues} />
    </SwitchWith404>
);

export default PinOptionsRoutes;
