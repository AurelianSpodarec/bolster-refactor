import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import AllUsersContainer from 'components/companyAdmin/users/allUsers/containers/AllUsersContainer';

const UsersRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllUsersContainer} />
    </SwitchWith404>
);

export default UsersRoutes;
