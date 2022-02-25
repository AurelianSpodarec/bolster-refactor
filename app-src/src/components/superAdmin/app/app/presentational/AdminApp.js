import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import AdminHeader from 'components/superAdmin/layout/header/presentational/AdminHeader';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import AdminRoutes from '../../routes/presentational';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const AdminApp = () => (
    <>
        <PageMeta meta={pageMeta.adminApp} />
        <div className="body-grid">
            <AdminHeader />
            <MenuContainer />
            <div id="page-area">
                <AdminRoutes />
            </div>
        </div>
    </>
);

export default AdminApp;
