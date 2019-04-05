import React from 'react';

import HeaderContainer from 'components/shared/layout/header/containers/HeaderContainer';
import FooterContainer from 'components/shared/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/shared/app/routes/presentational';
import ModalRoute from 'components/shared/generic/modals/containers/ModalRoot';

const AdminApp = () => (
    <div className="AdminApp">
        <HeaderContainer />
        <div className="full-container container">
            <MenuContainer />
            <Routes />
            <div className="clear" />
        </div>
        <FooterContainer />
        <div className="clear" />
        <ModalRoute />
    </div>
);

export default AdminApp;
