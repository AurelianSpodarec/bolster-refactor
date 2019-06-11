import React from 'react';

import FrontEndHeader from 'components/frontEnd/layout/header/presentational/FrontEndHeader';
import FrontEndMenu from 'components/frontEnd/layout/navigation/presentational/FrontEndMenu';
import FrontEndRoutes from '../../routes/presentational';
import FrontEndFooter from 'components/frontEnd/layout/footer/presentational/FrontEndFooter';
import FrontEndMobileMenuContainer from 'components/frontEnd/layout/navigation/containers/FrontEndMobileMenuContainer';

const FrontEndApp = () => (
    <div id="frontend-site">
        <FrontEndHeader />
        <FrontEndMenu />
        <FrontEndMobileMenuContainer />
        <FrontEndRoutes />

        <FrontEndFooter />
    </div>
);

export default FrontEndApp;
