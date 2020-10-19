import React from 'react';
import {connect} from 'react-redux';

import { useWindowDimensions } from 'helpers/hooks';
import { useBannerScroll } from 'helpers/frontEndHooks';

import PinsVideo from '_content/videos/frontend/05_Pins.mp4';

import setIsBannerScrolling from 'actions/frontEnd/banners/sync/setIsBannerScrolling';

import OurSystemListContainer from '../containers/OurSystemListContainer';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';
import OurSystemDivider from './OurSystemDivider';
import OurSystemCloudList from './OurSystemCloudList';
import BackToTopContainer from 'components/frontEnd/shared/backToTop/containers/BackToTopContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const WhyUseOurSystem = ({ setIsBannerScrolling }) => {
    const { width } = useWindowDimensions();
    useBannerScroll(width, setIsBannerScrolling);

    return (
        <>
            <Helmet title="Our System" />
            <div id="why-use-our-system">
                <FrontEndBanner
                    heading="So why use Bolster?"
                    video={PinsVideo}
                />
                <OurSystemDivider heading="Why use it? (Key benefits)" extraClasses="grey" />
                <OurSystemCloudList />
                <OurSystemDivider
                    heading="Services covered"
                    description="Click on an icon to find out more"
                />
                <OurSystemListContainer />
                <div className="request-demo-banner">
                    <FrontEndButton classes="gray" to="/contact">
                        Contact
                    </FrontEndButton>
                </div>
            </div>
            <BackToTopContainer />
        </>
    );
};

const mapDispatchToProps = {
    setIsBannerScrolling,
};

export default connect(null, mapDispatchToProps)(WhyUseOurSystem);
