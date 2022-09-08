import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import decodeJWT from 'actions/shared/jwt/async/decodeJWT';

import FrontEndRoutes from './routes/presentational';
import FrontEndFooterContainer from 'pages/public/layout/footer/containers/FrontEndFooterContainer';
import FrontEndHeaderContainer from 'pages/public/layout/header/container/FrontEndHeaderContainer';
import CookieConsentContainer from 'pages/public/cookieConsent/containers/CookieConsentContainer';

const FrontEndAppContainer = ({ isHome }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(decodeJWT());
    }, []);

    return (
        <div id="frontend-site">
            <FrontEndHeaderContainer />
            <FrontEndRoutes />

            <CookieConsentContainer />
            {location.pathname === '/' && <FrontEndFooterContainer />}
        </div>
    );
};

export default FrontEndAppContainer;
