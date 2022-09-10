import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import PushNotifications from 'pages/dashboard/superAdmin/pushNotifications/PushNotifications';

const PushNotificationsRoutes = ({ base = '/admin/push-notifications' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={PushNotifications} />
    </SwitchWith404>
);

export default PushNotificationsRoutes;
