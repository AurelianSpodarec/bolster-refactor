import React from 'react';

import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import AdminFooter from 'components/superAdmin/layout/footer/presentational/AdminFooter';
import FrontEndHeader from 'components/frontEnd/layout/header/presentational/FrontEndHeader';
import FrontEndRoutes from '../../routes/presentational';

const FrontEndApp = () => (
    <div id="frontend-site">
        <FrontEndHeader />
        <div className="full-container container">
            <MenuContainer />
            <div id="page-area">
                <FrontEndRoutes />
            </div>
        </div>
        <AdminFooter />
    </div>
);

export default FrontEndApp;
