import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';

import PushNotifications from 'pages/dashboard/companyAdmin/pushNotifications/PushNotifications';

const PushNotificationsRoutes = ({ base = '/company/push-notifications' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={PushNotifications} />
    </SwitchWith404>
);

export default PushNotificationsRoutes;
