import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import CompanyHeader from 'components/companyAdmin/layout/header/presentational/CompanyHeader';
import Footer from '../../../layout/Footer';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/companyAdmin/app/routes/presentational';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import AgreeToTermsCheck from '../containers/AgreeToTermsCheck';
import BannerNotificationContainer from 'components/shared/banners/containers/BannerNotificationContainer';
import Banner from 'components/shared/generic/banner/Banner';
import UnconfirmedEmailBanner from 'components/shared/generic/banner/UnconfirmedEmailBanner';

import '_content/scss/dashboard.scss';

const CompanyApp = () => (
    <>
        <PageMeta meta={pageMeta.companyApp} />

        <CompanyHeader />
        <div id="page-container">
            <MenuContainer />
            <div id="page-area">
                <AgreeToTermsCheck>
                    <BannerNotificationContainer />
                    <UnconfirmedEmailBanner />
                    <Banner />
                    <Routes />
                    <Footer />
                </AgreeToTermsCheck>
            </div>
        </div>
    </>
);

export default CompanyApp;
