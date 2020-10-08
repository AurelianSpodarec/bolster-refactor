import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import TextSettings from 'components/superAdmin/frontendTextEdit/containers/TextSettingsContainer';

const TextSettingRoutes = ({ base = '/admin/text-settings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={TextSettings} />
    </SwitchWith404>
);

export default TextSettingRoutes;
