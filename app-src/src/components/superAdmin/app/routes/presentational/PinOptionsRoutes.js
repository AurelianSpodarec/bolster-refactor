import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SuperAdminPinOptions from '../../../pinOptions/PinOptions';
import OptionValues from '../../../pinOptions/optionValues/OptionValues';
import OptionDocuments from '../../../pinOptions/optionDocuments/OptionDocuments';

const PinOptionsRoutes = ({ base = '/admin/pin-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={SuperAdminPinOptions} />
        <Route exact path={`${base}/:type/:setID`} component={OptionValues} />
        <Route
            exact
            path={`${base}/:type/:setID/option/:optionID/documents`}
            component={OptionDocuments}
        />
    </SwitchWith404>
);

export default PinOptionsRoutes;
