import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import AdminHeader from 'components/superAdmin/layout/header/presentational/AdminHeader';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import AdminRoutes from '../../routes/presentational';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import LoggedInFooter from 'components/shared/loggedInFooter/LoggedInFooter';

import '_content/scss/dashboard.scss';

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
