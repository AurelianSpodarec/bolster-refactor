import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FrontEndFooter from '../presentational/FrontEndFooter';
import { useWindowDimensions } from 'helpers/hooks';

const FrontEndFooterContainer = ({
    hideHeader,
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    cookieConsent,
}) => {
    const { width } = useWindowDimensions();

    return (
        <FrontEndFooter
            hideFooter={hideHeader}
            isLoggedIn={isSuperAdmin || isCompanyAdmin || isClientAccess}
            isMobile={width < 1025}
            cookieConsent={cookieConsent}
        />
    );
};

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: {
            jwtData: { isSuperAdmin, isClientAccess, isCompanyAdmin, companyID },
        },
    },
    frontEnd: {
        layoutReducer: {
            layout: { hideHeader },
        },
        cookieReducer: { cookieConsent },
    },
}) => ({
    hideHeader,
    isSuperAdmin,
    isCompanyAdmin: isCompanyAdmin || !!companyID,
    isClientAccess,
    cookieConsent,
});

export default withRouter(connect(mapStateToProps, null)(FrontEndFooterContainer));
