import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import ClientHeaderContainer from 'components/client/layout/header/containers/ClientHeaderContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/client/app/routes';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import Banner from 'components/shared/generic/banner/Banner';
import UnconfirmedEmailBanner from 'components/shared/generic/banner/UnconfirmedEmailBanner';
import LoggedInFooter from 'components/shared/loggedInFooter/LoggedInFooter';

import '_content/scss/dashboard.scss';

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
