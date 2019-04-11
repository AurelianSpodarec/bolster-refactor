import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SettingsContainer from 'components/companyAdmin/settings/containers/SettingsContainer';

const SettingsRoutes = ({ base = '/company/invoices' }) => (
    <SwitchWith404>
        <Route exact path={base} component={SettingsContainer} />
    </SwitchWith404>
);

export default SettingsRoutes;
