import React from 'react';

import HeaderContainer from 'components/shared/layout/header/containers/HeaderContainer';
import FooterContainer from 'components/shared/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/companyAdmin/app/routes/presentational';

const CompanyApp = () => (
    <>
        <HeaderContainer />
        <div className="full-container container">
            <MenuContainer />
            <div id="page-area">
                <Routes />
            </div>
        </div>
        <FooterContainer />
    </>
);

export default CompanyApp;
