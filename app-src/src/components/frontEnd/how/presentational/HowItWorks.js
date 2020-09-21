import React from 'react';

import { useBannerScroll } from 'helpers/frontEndHooks';
import { useWindowDimensions } from 'helpers/hooks';

import InspectVideo from '_content/videos/frontend/08_Inspect_Locate_Document.mp4';

import HowItWorksSections from './HowItWorksSections';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';

const HowItWorks = () => {
    const { width } = useWindowDimensions();
    useBannerScroll(width);

    return (
        <div id="how-it-works">
            <FrontEndBanner
                heading="How it works"
                description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet?"
                video={InspectVideo}
            />
            <HowItWorksSections />
        </div>
    );
};

export default HowItWorks;
