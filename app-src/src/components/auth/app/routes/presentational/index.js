import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/shared/app/routes/presentational/SwitchWith404';
import Login from 'components/shared/auth/login/presentational/Login';

const AuthRoutes = () => (
    <SwitchWith404>
        <Route exact path="/auth/login" component={Login} />
    </SwitchWith404>
);

export default AuthRoutes;
