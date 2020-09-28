import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import Home from 'components/frontEnd/home/presentational/Home';
import HowItWorks from 'components/frontEnd/how/presentational/HowItWorks';
import AboutPage from 'components/frontEnd/about/presentational/AboutPage';
import ContactPage from 'components/frontEnd/contact/presentational/ContactPage';
import ShareLinkDrawingContainer from 'components/frontEnd/drawingShareLinks/containers/ShareLinkDrawingContainer';
import QRCodesPageRedirect from 'components/frontEnd/qrCodes/containers/QRCodesPageRedirect';
import QRCodesPage from 'components/frontEnd/qrCodes/presentational/QRCodesPage';
import Login from 'components/frontEnd/auth/login/presentational/Login';
import WhyUseOurSystem from 'components/frontEnd/whyUseOurSystem/presentational/WhyUseOurSystem';
import Register from 'components/frontEnd/auth/register/presentational/Register';
import PageNotFoundContainer from 'components/frontEnd/404/containers/404PageContainer';

const FrontEndRoutes = ({ base = '/' }) => (
    <SwitchWith404>
        <Route exact path={`${base}page-not-found`} component={PageNotFoundContainer} />

        <Route exact path={`${base}`} component={Home} />
        <Route exact path={`${base}about-us`} component={AboutPage} />
        <Route exact path={`${base}how-it-works`} component={HowItWorks} />
        <Route exact path={`${base}our-system`} component={WhyUseOurSystem} />
        <Route exact path={`${base}contact`} component={ContactPage} />
        <Route
            exact
            path={`${base}drawingShareLinks/:shareKey`}
            component={ShareLinkDrawingContainer}
        />
        <Route path={`${base}qr/pin`} component={QRCodesPageRedirect} />
        <Route path={`${base}qrcode`} component={QRCodesPage} />

        <Route exact path={`${base}auth/Login`} component={Login} />
        <Route exact path={`${base}auth/register`} component={Register} />
    </SwitchWith404>
);

export default FrontEndRoutes;
