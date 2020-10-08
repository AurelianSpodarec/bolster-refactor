import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import TrustedByContainer from 'components/superAdmin/homeSettings/containers/TrustedByContainer';

const HomeSettingsRoutes = ({ base = '/admin/home-settings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/trusted-by`} component={TrustedByContainer} />
    </SwitchWith404>
);

export default HomeSettingsRoutes;
