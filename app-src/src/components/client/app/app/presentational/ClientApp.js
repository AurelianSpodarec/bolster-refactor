import React from 'react';

import ClientHeaderContainer from 'components/client/layout/header/containers/ClientHeaderContainer';
import FooterContainer from 'components/client/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/client/app/routes';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const ClientApp = () => (
    <div className="dashboard-area">
        <Helmet title="Client Access" />
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
