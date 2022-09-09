import React from 'react';
import { connect } from 'react-redux';

import { pageMeta } from 'constants/frontEnd/meta';

import { useBannerScroll } from 'helpers/frontEndHooks';
import { useWindowDimensions } from 'helpers/hooks';

import InspectVideo from 'assets/videos/frontend/08_Inspect_Locate_Document.mp4';
import InspectPoster from 'assets/videos/frontend/posters/08_Inspect_Locate_Document.jpg';

import setIsBannerScrolling from 'actions/frontEnd/banners/sync/setIsBannerScrolling';

import HowItWorksSections from './HowItWorksSections';
import FrontEndBanner from 'pages/public/shared/banners/presentational/FrontEndBanner';
import BackToTopContainer from 'pages/public/shared/backToTop/containers/BackToTopContainer';
import PageMeta from 'pages/public/shared/meta/presentational/PageMeta';

const HowItWorks = ({ setIsBannerScrolling }) => {
    const { width } = useWindowDimensions();
    useBannerScroll(width, setIsBannerScrolling);

    return (
        <>
            <PageMeta meta={pageMeta.howItWorks} />
            <div id="how-it-works">
                <FrontEndBanner
                    heading="How it works"
                    video={InspectVideo}
                    poster={InspectPoster}
                />
                <HowItWorksSections />
            </div>

            <BackToTopContainer />
        </>
    );
};

const mapDispatchToProps = {
    setIsBannerScrolling,
};

export default connect(null, mapDispatchToProps)(HowItWorks);
