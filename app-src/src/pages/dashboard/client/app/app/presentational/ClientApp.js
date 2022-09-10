import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import ClientHeaderContainer from 'pages/dashboard/client/layout/header/containers/ClientHeaderContainer';
import MenuContainer from 'components_DEPRECATED/shared/layout/menu/containers/MenuContainer';
import Routes from 'pages/dashboard/client/app/routes';
import PageMeta from 'pages/public/shared/meta/presentational/PageMeta';
import Banner from 'components_DEPRECATED/shared/generic/banner/Banner';
import UnconfirmedEmailBanner from 'components_DEPRECATED/shared/generic/banner/UnconfirmedEmailBanner';
import LoggedInFooter from 'components_DEPRECATED/shared/loggedInFooter/LoggedInFooter';

import 'styles/dashboard.scss';

const ClientApp = () => (
    <>
        <PageMeta meta={pageMeta.clientApp} />
        <ClientHeaderContainer />
        <div id="page-container">
            <MenuContainer />
            <div id="page-area">
                <div id="page-content" className="flex-column justify-between">
                    <div id="bulk-content">
                        <UnconfirmedEmailBanner />
                        <Banner />
                        <Routes />
                    </div>
                    <LoggedInFooter />
                </div>
            </div>
        </div>
    </>
);

export default ClientApp;
