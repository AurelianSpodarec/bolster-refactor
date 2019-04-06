import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import Login from 'components/shared/auth/login/presentational/Login';

const AuthRoutes = ({ base = '/auth' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/login`} component={Login} />
    </SwitchWith404>
);

export default AuthRoutes;
