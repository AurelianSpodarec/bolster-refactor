import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import Login from 'components/auth/login/presentational/Login';
import Register from 'components/auth/registration/presentational/Register';
import Terms from 'components/shared/terms/Terms';

const AuthRoutes = ({ base = '/auth' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/login`} component={Login} />
        <Route exact path={`${base}/register`} component={Register} />
        <Route exact path={`${base}/terms`} component={Terms} />
    </SwitchWith404>
);

export default AuthRoutes;
