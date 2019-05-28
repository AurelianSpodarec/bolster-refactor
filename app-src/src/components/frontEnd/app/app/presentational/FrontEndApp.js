import React from 'react';

import AdminFooter from 'components/superAdmin/layout/footer/presentational/AdminFooter';
import FrontEndHeader from 'components/frontEnd/layout/header/presentational/FrontEndHeader';
import FrontEndMenu from 'components/frontEnd/layout/navigation/presentational/FrontEndMenu';
import FrontEndRoutes from '../../routes/presentational';

const FrontEndApp = () => (
    <div id="frontend-site">
        <FrontEndHeader />
        <FrontEndMenu />

        <div className="full-container container">
            <div id="page-area">
                <FrontEndRoutes />
            </div>
        </div>
        <AdminFooter />
    </div>
);

export default FrontEndApp;
