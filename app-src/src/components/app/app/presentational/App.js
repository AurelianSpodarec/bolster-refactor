import React from 'react';

import HeaderContainer from 'components/layout/header/containers/HeaderContainer';
import FooterContainer from 'components/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/layout/menu/containers/MenuContainer';
import Routes from 'components/app/routes/presentational/Routes';

const App = () => (
    <div className="App">
        <HeaderContainer />
        <div className="container">
            <MenuContainer />
            <Routes />
        </div>
        <FooterContainer />
        <div className="clear" />
    </div>
);

export default App;
