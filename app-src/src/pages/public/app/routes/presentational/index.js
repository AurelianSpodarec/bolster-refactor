import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';

import Home from 'pages/public/home/presentational/Home';
import HowItWorks from 'pages/public/how/presentational/HowItWorks';
import AboutPage from 'pages/public/about/presentational/AboutPage';
import ContactPage from 'pages/public/contact/presentational/ContactPage';
import ShareLinkDrawingContainer from 'pages/public/drawingShareLinks/containers/ShareLinkDrawingContainer';
import QRCodesPageRedirect from 'pages/public/qrCodes/containers/QRCodesPageRedirect';
import QRCodesPage from 'pages/public/qrCodes/presentational/QRCodesPage';
import LoginContainer from 'pages/public/auth/login/containers/LoginContainer';
import WhyUseOurSystem from 'pages/public/whyUseOurSystem/presentational/WhyUseOurSystem';
import RegisterContainer from 'pages/public/auth/register/containers/RegisterContainer';
import TermsContainer from 'pages/public/termsAndConditions/containers/Ts&CsContainer';
import PrivacyPolicyContainer from 'pages/public/privacyPolicy/containers/PrivacyPolicyContainer';
import PageNotFound from 'pages/public/PageNotFound';
import EmailConfirmationRequired from 'pages/public/auth/login/EmailConfirmationRequired';
import ConfirmEmailAddress from 'pages/public/auth/login/ConfirmEmailAddress';
import PasswordReset from 'pages/public/auth/passwordReset/PasswordReset';
import AcceptInvitation from 'pages/public/auth/acceptInvitation/AcceptInvitation';
import SetPassword from 'pages/public/auth/setPassword/presentational/SetPassword';
import InvitationAcceptedOperative from 'pages/public/auth/success/InvitationAcceptedOperative';
import RegistrationSuccess from 'pages/public/auth/success/RegistrationSuccess';
import InvitationAcceptedAdmin from 'pages/public/auth/success/InvitationAcceptedAdmin';
import ConfirmChangeEmail from 'pages/public/auth/confirmChangeEmail/ConfirmChangeEmail';

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
        <Route exact path={`${base}auth/register/success`} component={RegistrationSuccess} />
        <Route exact path={`${base}auth/set-password`} component={SetPassword} />
        <Route
            exact
            path={`${base}auth/email-confirmation-required`}
            component={EmailConfirmationRequired}
        />
        <Route
            exact
            path={`${base}auth/confirm-email/:emailConfirmationCode`}
            component={ConfirmEmailAddress}
        />
        <Route
            exact
            path={`${base}auth/confirm-change-email/:token`}
            component={ConfirmChangeEmail}
        />
        <Route exact path={`${base}auth/acceptinvitation`} component={AcceptInvitation} />
        <Route
            exact
            path={`${base}auth/operative/invitation-accepted`}
            component={InvitationAcceptedOperative}
        />
        <Route
            exact
            path={`${base}auth/admin/invitation-accepted`}
            component={InvitationAcceptedAdmin}
        />
        <Route exact path={`${base}auth/passwordreset`} component={PasswordReset} />
        <Route exact path={`${base}auth/terms`} component={TermsContainer} />
        <Route exact path={`${base}auth/privacy-policy`} component={PrivacyPolicyContainer} />
    </SwitchWith404>
);

export default FrontEndRoutes;
