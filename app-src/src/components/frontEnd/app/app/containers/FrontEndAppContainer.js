import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import FrontEndApp from '../presentational/FrontEndApp';

const FrontEndAppContainer = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(decodeJWT());
    }, []);

    return <FrontEndApp isHome={location.pathname === '/'} />;
};

export default FrontEndAppContainer;
