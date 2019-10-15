import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import RecentlyDeletedContainer from 'components/companyAdmin/recentlyDeleted/recentlyDeleted/containers/RecentlyDeletedContainer';

const RecentlyDeletedRoutes = ({ base = '/company/recently-deleted' }) => (
    <SwitchWith404>
        <Route exact path={base} component={RecentlyDeletedContainer} />
    </SwitchWith404>
);

export default RecentlyDeletedRoutes;
