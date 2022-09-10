import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import AdminHeader from 'pages/dashboard/superAdmin/layout/header/presentational/AdminHeader';
import MenuContainer from 'components_DEPRECATED/shared/layout/menu/containers/MenuContainer';
import AdminRoutes from '../../routes/presentational';
import PageMeta from 'pages/public/shared/meta/presentational/PageMeta';
import LoggedInFooter from 'components_DEPRECATED/shared/loggedInFooter/LoggedInFooter';

import 'styles/dashboard.scss';

const AdminApp = () => (
    <>
        <PageMeta meta={pageMeta.adminApp} />
        <AdminHeader />
        <div id="page-container">
            <MenuContainer />
            <div id="page-area">
                <div id="page-content" className="flex-column justify-between">
                    <div id="bulk-content">
                        <AdminRoutes />
                    </div>
                    <LoggedInFooter />
                </div>
            </div>
        </div>
    </>
);

export default AdminApp;
