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
import LoginContainer from 'components/frontEnd/auth/login/containers/LoginContainer';
import WhyUseOurSystem from 'components/frontEnd/whyUseOurSystem/presentational/WhyUseOurSystem';
import RegisterContainer from 'components/frontEnd/auth/register/containers/RegisterContainer';
import TermsContainer from 'components/frontEnd/termsAndConditions/containers/Ts&CsContainer';
import PrivacyPolicyContainer from 'components/frontEnd/privacyPolicy/containers/PrivacyPolicyContainer';
import PageNotFound from 'components/frontEnd/404/presentational/404Page';

const FrontEndRoutes = ({ base = '/' }) => (
    <SwitchWith404>
        <Route exact path={`${base}page-not-found`} component={PageNotFound} />

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
        <Route path={`${base}qr/zone`} component={QRCodesPageRedirect} />
        <Route path={`${base}qrcode`} component={QRCodesPage} />

        <Route exact path={`${base}auth/Login`} component={LoginContainer} />
        <Route exact path={`${base}auth/register`} component={RegisterContainer} />
        <Route exact path={`${base}auth/terms`} component={TermsContainer} />
        <Route exact path={`${base}auth/privacy-policy`} component={PrivacyPolicyContainer} />
    </SwitchWith404>
);

export default FrontEndRoutes;
