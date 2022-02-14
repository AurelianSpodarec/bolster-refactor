import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import UserCreations from 'components/superAdmin/userCreations/UserCreations';

const UserCreationsRoutes = ({ base = '/admin/user-creations' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={UserCreations} />
    </SwitchWith404>
);

export default UserCreationsRoutes;
