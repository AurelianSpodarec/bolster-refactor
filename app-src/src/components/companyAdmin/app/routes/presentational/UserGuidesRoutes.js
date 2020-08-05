import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import UserGuidesContainer from 'components/companyAdmin/userGuides/containers/UserGuidesContainer';

const UserGuidesRoutes = ({ base = '/company/user-guides' }) => (
    <SwitchWith404>
        <Route exact path={base} component={UserGuidesContainer} />
    </SwitchWith404>
);

export default UserGuidesRoutes;
