import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import Login from 'components/auth/login/presentational/Login';

const AuthRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/login`} component={Login} />
    </SwitchWith404>
);

export default AuthRoutes;
