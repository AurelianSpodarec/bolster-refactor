import React from 'react';

import FrontEndRoutes from '../../routes/presentational';
import FrontEndFooter from 'components/frontEnd/layout/footer/presentational/FrontEndFooter';
import FrontEndMobileMenuContainer from 'components/frontEnd/layout/navigation/containers/FrontEndMobileMenuContainer';
import FrontEndHeaderContainer from 'components/frontEnd/layout/header/container/FrontEndHeaderContainer';

const FrontEndApp = ({ isHome }) => {
    return (
        <div id="frontend-site">
            <FrontEndHeaderContainer />
            <FrontEndMobileMenuContainer />
            <FrontEndRoutes />

            {!isHome && <FrontEndFooter />}
        </div>
    );
};

export default FrontEndApp;
