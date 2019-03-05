import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import AllMessages from 'components/messages/allMessages/presentational/AllMessages';

const AuthRoutes = () => (
    <SwitchWith404>
        <Route exact path="/messages" component={AllMessages} />
    </SwitchWith404>
);

export default AuthRoutes;
