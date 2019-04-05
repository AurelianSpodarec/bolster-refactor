import React from 'react';

import HeaderContainer from 'components/shared/layout/header/containers/HeaderContainer';
import FooterContainer from 'components/shared/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/shared/app/routes/presentational';
import ModalRoute from 'components/shared/generic/modals/containers/ModalRoot';

// import NotFound from 'components/shared/notFound/presentational/NotFound';
// import SwitchWith404 from './SwitchWith404';
// import AuthRoutes from './auth';
// import AdminRoutes from './superAdmin';
// import CompanyAdminRoutes from './companyAdmin';
// import TestRoutes from './test';

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
