import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import TrustedByContainer from 'components/superAdmin/homeSettings/containers/TrustedByContainer';
import EditTrustedByContainer from 'components/superAdmin/homeSettings/containers/EditTrustedByContainer';

const HomeSettingsRoutes = ({ base = '/admin/trusted-by-settings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={TrustedByContainer} />
        <Route exact path={`${base}/edit-settings`} component={EditTrustedByContainer} />
    </SwitchWith404>
);

export default HomeSettingsRoutes;
