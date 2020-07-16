import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import UserGuides from 'components/companyAdmin/userGuides/UserGuides';

const UserGuidesRoutes = ({ base = '/company/user-guides' }) => (
    <SwitchWith404>
        <Route exact path={base} component={UserGuides} />
    </SwitchWith404>
);

export default UserGuidesRoutes;
