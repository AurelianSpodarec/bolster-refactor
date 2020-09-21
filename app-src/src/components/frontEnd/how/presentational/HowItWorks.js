import React from 'react';

import { useBannerScroll } from 'helpers/frontEndHooks';
import { useWindowDimensions } from 'helpers/hooks';

import HowItWorksSections from './HowItWorksSections';
import FrontEndBanner from 'components/frontEnd/shared/banners/presentational/FrontEndBanner';

const HowItWorks = () => {
    const { width } = useWindowDimensions();
    useBannerScroll(width);

    return (
        <div id="how-it-works">
            <FrontEndBanner
                heading="So why use Bolster?"
                description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet?"
            />
            <HowItWorksSections />
        </div>
    );
};

export default HowItWorks;
