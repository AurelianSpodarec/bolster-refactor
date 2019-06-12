import React from 'react';

import FrontEndMenu from 'components/frontEnd/layout/navigation/presentational/FrontEndMenu';
import FrontEndRoutes from '../../routes/presentational';
import FrontEndFooter from 'components/frontEnd/layout/footer/presentational/FrontEndFooter';
import FrontEndMobileMenuContainer from 'components/frontEnd/layout/navigation/containers/FrontEndMobileMenuContainer';
import FrontEndHeaderContainer from 'components/frontEnd/layout/header/container/FrontEndHeaderContainer';

const FrontEndApp = () => (
    <div id="frontend-site">
        <FrontEndHeaderContainer />
        <FrontEndMenu />
        <FrontEndMobileMenuContainer />
        <FrontEndRoutes />

        <FrontEndFooter />
    </div>
);

export default FrontEndApp;
