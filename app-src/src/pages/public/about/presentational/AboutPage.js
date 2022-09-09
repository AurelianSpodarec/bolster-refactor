import React from 'react';
import { connect } from 'react-redux';

import { pageMeta } from 'constants/frontEnd/meta';
import { useWindowDimensions } from 'helpers/hooks';
import { useBannerScroll } from 'helpers/frontEndHooks';

import InspectVideo from 'assets/videos/frontend/about-us.mp4';
import InspectPoster from 'assets/videos/frontend/posters/about-us.jpg';

import setIsBannerScrolling from 'actions/frontEnd/banners/sync/setIsBannerScrolling';

import AboutUsInfoContainer from '../container/AboutUsInfoContainer';
import FrontEndBanner from 'pages/public/shared/banners/presentational/FrontEndBanner';
import Accreditations from 'pages/public/Accreditations';

import BackToTopContainer from 'pages/public/shared/backToTop/containers/BackToTopContainer';
import PageMeta from 'pages/public/shared/meta/presentational/PageMeta';

const AboutPage = ({ setIsBannerScrolling }) => {
    const { width } = useWindowDimensions();
    useBannerScroll(width, setIsBannerScrolling);

    return (
        <>
            <PageMeta meta={pageMeta.aboutUs} />
            <div id="about">
                <FrontEndBanner heading="About us" video={InspectVideo} poster={InspectPoster} />
                <AboutUsInfoContainer />
                <Accreditations />
            </div>
            <BackToTopContainer />
        </>
    );
};

const mapDispatchToProps = {
    setIsBannerScrolling,
};

export default connect(null, mapDispatchToProps)(AboutPage);
