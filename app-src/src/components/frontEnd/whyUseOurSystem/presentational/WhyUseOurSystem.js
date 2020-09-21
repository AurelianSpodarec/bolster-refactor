import React from 'react';

import { useWindowDimensions } from 'helpers/hooks';
import { useBannerScroll } from 'helpers/frontEndHooks';

import PinsVideo from '_content/videos/frontend/05_Pins.mp4';

import OurSystemListContainer from '../containers/OurSystemListContainer';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';

const WhyUseOurSystem = () => {
    const { width } = useWindowDimensions();
    useBannerScroll(width);

    return (
        <div id="why-use-our-system">
            <FrontEndBanner
                heading="So why use Bolster?"
                description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet?"
                video={PinsVideo}
            />
            <div className="page-divider">
                <h2>Lorem Ipsum</h2>
                <div className="divider"></div>
                <p>Neque porro quisquam est qui do lorem amet?</p>
            </div>
            <OurSystemListContainer />
        </div>
    );
};

export default WhyUseOurSystem;
