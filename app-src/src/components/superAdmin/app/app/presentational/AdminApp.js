import React from 'react';

import AdminHeader from 'components/superAdmin/layout/header/presentational/AdminHeader';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import AdminFooter from 'components/superAdmin/layout/footer/presentational/AdminFooter';
import AdminRoutes from '../../routes/presentational';

const AdminApp = () => (
    <>
        <AdminHeader />
        <div className="full-container container">
            <MenuContainer />
            <div id="page-area">
                <AdminRoutes />
            </div>
        </div>
        <AdminFooter />
    </>
);

export default AdminApp;
