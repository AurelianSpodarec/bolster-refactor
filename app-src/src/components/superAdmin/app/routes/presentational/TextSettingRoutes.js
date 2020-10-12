import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import TextSettings from 'components/superAdmin/frontendTextEdit/containers/TextSettingsContainer';
import EditTextSettingsContainer from 'components/superAdmin/frontendTextEdit/editTextSettings/containers/EditTextSettingsContainer';

const TextSettingRoutes = ({ base = '/admin/text-settings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={TextSettings} />
        <Route exact path={`${base}/edit-settings`} component={EditTextSettingsContainer} />
    </SwitchWith404>
);

export default TextSettingRoutes;
