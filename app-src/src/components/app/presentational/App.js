import React from 'react';

import HeaderContainer from 'components/layout/containers/HeaderContainer';
import FooterContainer from 'components/layout/containers/FooterContainer';
import MenuContainer from 'components/layout/containers/MenuContainer';
import Routes from 'components/app/presentational/Routes';

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
