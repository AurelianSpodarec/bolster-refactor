import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import HomeContainer from 'components/frontEnd/home/containers/HomeContainer';
import HowPage from 'components/frontEnd/how/presentational/HowPage';
import AboutPage from 'components/frontEnd/about/presentational/AboutPage';

const FrontEndRoutes = ({ base = '/' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={HomeContainer} />
        <Route exact path={`${base}how`} component={HowPage} />
        <Route exact path={`${base}about`} component={AboutPage} />
    </SwitchWith404>
);

export default FrontEndRoutes;
