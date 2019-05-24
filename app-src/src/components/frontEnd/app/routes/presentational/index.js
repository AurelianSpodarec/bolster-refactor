import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import { HomeContainer } from 'components/frontEnd/home/containers/HomeContainer';

const FrontEndRoutes = ({ base = '/Home' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={HomeContainer} />
    </SwitchWith404>
);

export default FrontEndRoutes;
