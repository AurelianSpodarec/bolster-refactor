import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import HomeContainer from 'components/frontEnd/home/containers/HomeContainer';
import HowItWorks from 'components/frontEnd/how/presentational/HowItWorks';
import AboutPageContainer from 'components/frontEnd/about/container/AboutPageContainer';
import ContactPageContainer from 'components/frontEnd/contact/containers/ContactPageContainer';
import ShareLinkDrawingContainer from 'components/frontEnd/drawingShareLinks/containers/ShareLinkDrawingContainer';
import QRCodesPageRedirect from 'components/frontEnd/qrCodes/containers/QRCodesPageRedirect';
import QRCodesPage from 'components/frontEnd/qrCodes/presentational/QRCodesPage';
import LoginContainer from 'components/frontEnd/auth/login/containers/LoginContainer';
import WhyUseOurSystem from 'components/frontEnd/whyUseOurSystem/presentational/WhyUseOurSystem';
import RegisterContainer from 'components/frontEnd/auth/register/containers/RegisterContainer';
import Terms from 'components/shared/terms/Terms';

const FrontEndRoutes = ({ base = '/' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={HomeContainer} />
        <Route exact path={`${base}about-us`} component={AboutPageContainer} />
        <Route exact path={`${base}how-it-works`} component={HowItWorks} />
        <Route exact path={`${base}our-system`} component={WhyUseOurSystem} />
        <Route exact path={`${base}contact`} component={ContactPageContainer} />
        <Route
            exact
            path={`${base}drawingShareLinks/:shareKey`}
            component={ShareLinkDrawingContainer}
        />
        <Route path={`${base}qr/pin`} component={QRCodesPageRedirect} />
        <Route path={`${base}qrcode`} component={QRCodesPage} />

        <Route exact path={`${base}auth/Login`} component={LoginContainer} />
        <Route exact path={`${base}auth/register`} component={RegisterContainer} />
        <Route exact path={`${base}auth/terms`} component={Terms} />
    </SwitchWith404>
);

export default FrontEndRoutes;
