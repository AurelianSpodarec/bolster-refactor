import React from 'react';

import AdminHeader from 'components/superAdmin/layout/header/presentational/AdminHeader';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import AdminFooter from 'components/superAdmin/layout/footer/presentational/AdminFooter';

const AdminApp = () => (
    <>
        <AdminHeader />
        <div className="full-container container">
            <div id="page-area">
                {/* <AuthRoutes /> */}
                <MenuContainer />
            </div>
        </div>
        <AdminFooter />
    </>
);

export default AdminApp;
