import React from 'react';

import HeaderContainer from 'components/layout/header/containers/HeaderContainer';
import FooterContainer from 'components/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/layout/menu/containers/MenuContainer';
import Routes from 'components/shared/app/routes/presentational';
import ModalRoute from 'components/shared/generic/modals/containers/ModalRoot';

const App = () => (
    <div className="App">
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

export default App;
