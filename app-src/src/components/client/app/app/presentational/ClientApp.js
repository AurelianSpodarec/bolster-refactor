import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import ClientHeaderContainer from 'components/client/layout/header/containers/ClientHeaderContainer';
import FooterContainer from 'components/client/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/client/app/routes';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const ClientApp = () => (
    <div className="dashboard-area">
        <PageMeta meta={pageMeta.clientApp} />
        <ClientHeaderContainer />
        <div className="full-container container">
            <MenuContainer />
            <div id="page-area">
                <Routes />
            </div>
        </div>
        <FooterContainer />
    </div>
);

export default ClientApp;
