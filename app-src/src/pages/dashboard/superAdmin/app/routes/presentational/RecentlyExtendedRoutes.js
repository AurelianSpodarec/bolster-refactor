import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import RecentlyExtended from 'pages/dashboard/superAdmin/recentlyExtended/presentational/RecentlyExtended';

const RecentlyExtendedRoutes = ({ base = '/admin/recently-extended' }) => (
    <SwitchWith404>
        <Route exact path={base} component={RecentlyExtended} />
    </SwitchWith404>
);

export default RecentlyExtendedRoutes;
