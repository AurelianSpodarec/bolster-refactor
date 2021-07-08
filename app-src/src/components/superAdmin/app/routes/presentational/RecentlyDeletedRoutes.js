import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import RecentlyDeletedContainer from 'components/superAdmin/recentlyDeleted/recentlyDeleted/containers/RecentlyDeletedContainer';

const RecentlyDeletedRoutes = ({ base = '/admin/recently-deleted' }) => (
    <SwitchWith404>
        <Route exact path={base} component={RecentlyDeletedContainer} />
    </SwitchWith404>
);

export default RecentlyDeletedRoutes;
