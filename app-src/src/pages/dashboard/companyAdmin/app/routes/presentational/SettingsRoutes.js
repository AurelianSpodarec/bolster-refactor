import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import SettingsContainer from 'pages/dashboard/companyAdmin/settings/companySettings/containers/SettingsContainer';
import EditSettingsContainer from 'pages/dashboard/companyAdmin/settings/editCompanySettings/containers/EditSettingsContainer';

const SettingsRoutes = ({ base = '/company/settings' }) => (
    <SwitchWith404>
        <Route exact path={base} component={SettingsContainer} />
        <Route exact path={`${base}/edit-settings`} component={EditSettingsContainer} />
    </SwitchWith404>
);

export default SettingsRoutes;
