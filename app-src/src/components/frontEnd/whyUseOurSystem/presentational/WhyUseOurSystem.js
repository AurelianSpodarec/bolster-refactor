import React from 'react';

import { useWindowDimensions } from 'helpers/hooks';
import { useBannerScroll } from 'helpers/frontEndHooks';

import PinsVideo from '_content/videos/frontend/05_Pins.mp4';

import OurSystemListContainer from '../containers/OurSystemListContainer';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';
import OurSystemDivider from './OurSystemDivider';
import OurSystemCloudList from './OurSystemCloudList';
import BackToTop from 'components/frontEnd/shared/backToTop/presentational/BackToTop';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const WhyUseOurSystem = () => {
    const { width } = useWindowDimensions();
    useBannerScroll(width);

    return (
        <>
            <div id="why-use-our-system">
                <FrontEndBanner
                    heading="So why use Bolster?"
                    description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet?"
                    video={PinsVideo}
                />
                <OurSystemDivider
                    heading="Lorem Ipsum"
                    description="Neque porro quisquam est qui do lorem amet?"
                    extraClasses="grey"
                />
                <OurSystemCloudList />
                <OurSystemDivider
                    heading="Lorem Ipsum"
                    description="Neque porro quisquam est qui do lorem amet?"
                />
                <OurSystemListContainer />
                <div className="request-demo-banner">
                    <FrontEndButton classes="gray" to="/contact">
                        Request Demo
                    </FrontEndButton>
                </div>
            </div>
            <BackToTop />
        </>
    );
};

export default WhyUseOurSystem;
