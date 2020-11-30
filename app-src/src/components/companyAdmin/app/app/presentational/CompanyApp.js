import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import CompanyHeaderContainer from 'components/companyAdmin/layout/header/containers/CompanyHeaderContainer';
import FooterContainer from 'components/companyAdmin/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/companyAdmin/app/routes/presentational';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import AgreeToTermsCheck from '../containers/AgreeToTermsCheck';

const CompanyApp = () => (
    <div className="dashboard-area">
        <PageMeta meta={pageMeta.companyApp} />
        <CompanyHeaderContainer />
        <div className="full-container container">
            <MenuContainer />
            <div id="page-area" className="obvious-class-name">
                <Routes />
            </div>
        </div>
        <FooterContainer />
    </div>
);

export default CompanyApp;
