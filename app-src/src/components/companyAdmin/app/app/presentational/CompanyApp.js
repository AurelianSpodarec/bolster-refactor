import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import CompanyHeaderContainer from 'components/companyAdmin/layout/header/containers/CompanyHeaderContainer';
import FooterContainer from 'components/companyAdmin/layout/footer/containers/FooterContainer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/companyAdmin/app/routes/presentational';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import AgreeToTermsCheck from '../containers/AgreeToTermsCheck';
import BannerNotificationContainer from 'components/shared/banners/containers/BannerNotificationContainer';
import Banner from 'components/shared/generic/banner/Banner';
import UnconfirmedEmailBanner from 'components/shared/generic/banner/UnconfirmedEmailBanner';

const CompanyApp = () => (
    <div className="dashboard-area">
        <PageMeta meta={pageMeta.companyApp} />
        <CompanyHeaderContainer />
        <div className="full-container container">
            <MenuContainer />
            <div id="page-area" className="obvious-class-name">
                <AgreeToTermsCheck>
                    <BannerNotificationContainer />
                    <UnconfirmedEmailBanner />
                    <Banner />
                    <Routes />
                </AgreeToTermsCheck>
            </div>
        </div>
        <FooterContainer />
    </div>
);

export default CompanyApp;
