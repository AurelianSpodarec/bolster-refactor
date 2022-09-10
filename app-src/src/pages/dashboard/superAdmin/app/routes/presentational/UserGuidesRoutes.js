import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import UserGuideContainer from 'pages/dashboard/superAdmin/userGuides/containers/UserGuideContainer';

const UsersRoutes = ({ base = '/admin/user-guides' }) => (
    <SwitchWith404>
        <Route exact path={base} component={UserGuideContainer} />
    </SwitchWith404>
);

export default UsersRoutes;
