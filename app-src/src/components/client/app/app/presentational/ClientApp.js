import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import ClientHeaderContainer from 'components/client/layout/header/containers/ClientHeaderContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/client/app/routes';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import Banner from 'components/shared/generic/banner/Banner';
import UnconfirmedEmailBanner from 'components/shared/generic/banner/UnconfirmedEmailBanner';

import '_content/scss/dashboard.scss';

const ClientApp = () => (
    <>
        <PageMeta meta={pageMeta.clientApp} />
        <ClientHeaderContainer />
        <div id="page-container">
            <MenuContainer />
            <div id="page-area">
                <UnconfirmedEmailBanner />
                <Banner />
                <Routes />
            </div>
        </div>
    </>
);

export default ClientApp;
