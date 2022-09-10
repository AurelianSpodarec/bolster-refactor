import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import BannerNotificationsContainer from 'pages/dashboard/superAdmin/bannerNotifications/containers/BannerNotificationsContainer';

const MergeToolRoutes = ({ base = '/admin/banners' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={BannerNotificationsContainer} />
    </SwitchWith404>
);

export default MergeToolRoutes;
