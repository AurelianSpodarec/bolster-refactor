import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';

import PinOptions from 'pages/dashboard/companyAdmin/pinOptions/PinOptions';
import OptionValues from 'pages/dashboard/companyAdmin/pinOptions/optionValues/OptionValues';
import OptionDocuments from 'pages/dashboard/companyAdmin/pinOptions/optionDocuments/OptionDocuments';

const PinOptionsRoutes = ({ base = '/company/pin-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={PinOptions} />
        <Route exact path={`${base}/:type/:setID`} component={OptionValues} />
        <Route
            exact
            path={`${base}/:type/:setID/option/:optionID/documents`}
            component={OptionDocuments}
        />
    </SwitchWith404>
);

export default PinOptionsRoutes;
