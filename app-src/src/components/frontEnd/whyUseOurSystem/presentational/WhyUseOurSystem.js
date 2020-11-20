import React from 'react';
import { connect } from 'react-redux';

import { pageMeta } from 'constants/frontEnd/meta';

import { useWindowDimensions } from 'helpers/hooks';
import { useBannerScroll } from 'helpers/frontEndHooks';

import PinsVideo from '_content/videos/frontend/05_Pins.mp4';
import PinsPoster from '_content/videos/frontend/posters/05_Pins.jpg';

import setIsBannerScrolling from 'actions/frontEnd/banners/sync/setIsBannerScrolling';

import OurSystemListContainer from '../containers/OurSystemListContainer';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';
import OurSystemDivider from './OurSystemDivider';
import OurSystemCloudList from './OurSystemCloudList';
import BackToTopContainer from 'components/frontEnd/shared/backToTop/containers/BackToTopContainer';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const WhyUseOurSystem = ({ setIsBannerScrolling }) => {
    const { width } = useWindowDimensions();
    useBannerScroll(width, setIsBannerScrolling);

    return (
        <>
            <PageMeta meta={pageMeta.ourSystem} />
            <div id="why-use-our-system">
                <FrontEndBanner
                    heading="So why use Bolster?"
                    video={PinsVideo}
                    poster={PinsPoster}
                />
                <OurSystemCloudList />
                <OurSystemDivider
                    heading="Services covered"
                    description="Click on an icon to find out more"
                />
                <OurSystemListContainer />
                <BackToTopContainer />
            </div>
        </>
    );
};

const mapDispatchToProps = {
    setIsBannerScrolling,
};

export default connect(null, mapDispatchToProps)(WhyUseOurSystem);
