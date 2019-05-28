import React from 'react';

import AdminFooter from 'components/superAdmin/layout/footer/presentational/AdminFooter';
import FrontEndHeader from 'components/frontEnd/layout/header/presentational/FrontEndHeader';
import FrontEndMenu from 'components/frontEnd/layout/navigation/presentational/FrontEndMenu';
import FrontEndRoutes from '../../routes/presentational';

const FrontEndApp = () => (
    <div id="frontend-site">
        <FrontEndHeader />
        <FrontEndMenu />

        <FrontEndRoutes />

        <AdminFooter />
    </div>
);

export default FrontEndApp;
