import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import HomeContainer from 'components/frontEnd/home/containers/HomeContainer';
import HowPage from 'components/frontEnd/how/presentational/HowPage';
import AboutPage from 'components/frontEnd/about/presentational/AboutPage';
import RequestPageContainer from 'components/frontEnd/request/containers/RequestPageContainer';
import ContactPageContainer from 'components/frontEnd/contact/containers/ContactPageContainer';
import ShareLinkDrawingContainer from 'components/frontEnd/drawingShareLinks/containers/ShareLinkDrawingContainer';
import QRCodesPageRedirect from 'components/frontEnd/qrCodes/containers/QRCodesPageRedirect';
import QRCodesPage from 'components/frontEnd/qrCodes/presentational/QRCodesPage';

const FrontEndRoutes = ({ base = '/' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={HomeContainer} />
        <Route exact path={`${base}How`} component={HowPage} />
        <Route exact path={`${base}About`} component={AboutPage} />
        <Route exact path={`${base}Request`} component={RequestPageContainer} />
        <Route exact path={`${base}Contact`} component={ContactPageContainer} />
        <Route
            exact
            path={`${base}drawingShareLinks/:shareKey`}
            component={ShareLinkDrawingContainer}
        />
        <Route path={`${base}qr/pin`} component={QRCodesPageRedirect} />
        <Route path={`${base}qr/zone`} component={QRCodesPageRedirect} />
        <Route path={`${base}qrcode`} component={QRCodesPage} />
    </SwitchWith404>
);

export default FrontEndRoutes;
