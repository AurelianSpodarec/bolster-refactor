import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import BannerNotifications from 'components/superAdmin/bannerNotifications/presentational/BannerNotifications';

const MergeToolRoutes = ({ base = '/admin/banners' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={BannerNotifications} />
    </SwitchWith404>
);

export default MergeToolRoutes;
