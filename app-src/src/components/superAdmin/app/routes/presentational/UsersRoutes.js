import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllUsersContainer from 'components/superAdmin/users/allUsers/containers/AllUsersContainer';

const UsersRoutes = ({ base = '/admin/users' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllUsersContainer} />
    </SwitchWith404>
);

export default UsersRoutes;
