import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FrontEndFooter from '../presentational/FrontEndFooter';
import { useWindowDimensions } from 'helpers/hooks';

const FrontEndFooterContainer = ({ hideHeader, isSuperAdmin, isCompanyAdmin, isClientAccess }) => {
    const { width } = useWindowDimensions();

    return (
        <FrontEndFooter
            hideFooter={hideHeader}
            isLoggedIn={isSuperAdmin || isCompanyAdmin || isClientAccess}
            isMobile={width < 1025}
        />
    );
};

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: {
            jwtData: { isSuperAdmin, isClientAccess, companyID },
        },
    },
    frontEnd: {
        layoutReducer: {
            layout: { hideHeader },
        },
    },
}) => ({
    hideHeader,
    isSuperAdmin,
    isCompanyAdmin: !!companyID,
    isClientAccess,
});

export default withRouter(connect(mapStateToProps, null)(FrontEndFooterContainer));
