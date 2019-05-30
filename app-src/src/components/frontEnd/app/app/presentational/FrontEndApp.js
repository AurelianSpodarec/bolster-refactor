import React from 'react';

import FrontEndHeader from 'components/frontEnd/layout/header/presentational/FrontEndHeader';
import FrontEndMenu from 'components/frontEnd/layout/navigation/presentational/FrontEndMenu';
import FrontEndRoutes from '../../routes/presentational';
import FrontEndFooter from 'components/frontEnd/layout/footer/presentational/FrontEndFooter';

const FrontEndApp = () => (
    <div id="frontend-site">
        <FrontEndHeader />
        <FrontEndMenu />

        <FrontEndRoutes />

        <FrontEndFooter />
    </div>
);

export default FrontEndApp;
