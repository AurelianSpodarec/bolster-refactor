import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import LoginContainer from 'components/auth/login/containers/LoginContainer';

const AuthRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/login`} component={LoginContainer} />
    </SwitchWith404>
);

export default AuthRoutes;
