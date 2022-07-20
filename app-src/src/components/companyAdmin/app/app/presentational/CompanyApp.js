import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';

import { pageMeta } from 'constants/frontEnd/meta';

import CompanyHeader from 'components/companyAdmin/layout/header/presentational/CompanyHeader';
import MenuContainer from 'components/shared/layout/menu/containers/MenuContainer';
import Routes from 'components/companyAdmin/app/routes/presentational';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import AgreeToTermsCheck from '../containers/AgreeToTermsCheck';
import BannerNotificationContainer from 'components/shared/banners/containers/BannerNotificationContainer';
import Banner from 'components/shared/generic/banner/Banner';
import UnconfirmedEmailBanner from 'components/shared/generic/banner/UnconfirmedEmailBanner';
import LoggedInFooter from 'components/shared/loggedInFooter/LoggedInFooter';

import '_content/scss/dashboard.scss';

const CompanyApp = () => {
    const history = useHistory();
    const isTimesheet = history.location.pathname === '/company/users-management/timesheets';
    return (
        <>
            <PageMeta meta={pageMeta.companyApp} />

            <CompanyHeader />
            <div id="page-container">
                <MenuContainer />
                <div
                    id="page-area"
                    style={{ overflowX: 'hidden' }}
                    className={isTimesheet ? 'darker-background' : ''}
                >
                    {/* <AgreeToTermsCheck> */}
                    <div id="page-content" className="flex-column justify-between">
                        <div id="bulk-content">
                            <BannerNotificationContainer />
                            <UnconfirmedEmailBanner />
                            <Banner />
                            <Routes />
                            <ReactTooltip effect="solid" className="react-tooltip" />
                        </div>
                        <LoggedInFooter />
                    </div>
                    {/* </AgreeToTermsCheck> */}
                </div>
            </div>
        </>
    );
};

export default CompanyApp;
