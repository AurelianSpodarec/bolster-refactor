import React from 'react';

import ClientHeaderContainer from 'components/client/layout/header/containers/ClientHeaderContainer';
import FooterContainer from 'components/client/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/client/app/routes';

const ClientApp = () => (
    <>
        <ClientHeaderContainer />
        <div className="full-container container">
            <MenuContainer />
            <div id="page-area">
                <Routes />
            </div>
        </div>
        <FooterContainer />
    </>
);

export default ClientApp;
