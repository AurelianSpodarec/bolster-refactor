import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import decodeJWT from 'actions/shared/jwt/async/decodeJWT';

import RoutesPublic from './routes/RoutesPublic';

import FrontEndFooterContainer from 'pages/public/_components/footer/containers/FrontEndFooterContainer';
import FrontEndHeaderContainer from 'pages/public/_components/header/container/FrontEndHeaderContainer';

import CookieConsentContainer from 'pages/public/CookieConsentContainer';

const FrontEndAppContainer = ({ isHome }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(decodeJWT());
    }, []);

    return (
        <div id="frontend-site">
            <FrontEndHeaderContainer />
            <RoutesPublic />

            <CookieConsentContainer />
            {location.pathname === '/' && <FrontEndFooterContainer />}
        </div>
    );
};

export default FrontEndAppContainer;
