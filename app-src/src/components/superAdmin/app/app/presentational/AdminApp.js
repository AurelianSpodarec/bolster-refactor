import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import AdminHeader from 'components/superAdmin/layout/header/presentational/AdminHeader';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import AdminFooter from 'components/superAdmin/layout/footer/presentational/AdminFooter';
import AdminRoutes from '../../routes/presentational';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const AdminApp = () => (
    <div className="dashboard-area">
        <PageMeta meta={pageMeta.adminApp} />
        <AdminHeader />
        <div className="full-container container">
            <MenuContainer />
            <div id="page-area">
                <AdminRoutes />
            </div>
        </div>
        <AdminFooter />
    </div>
);

export default AdminApp;
