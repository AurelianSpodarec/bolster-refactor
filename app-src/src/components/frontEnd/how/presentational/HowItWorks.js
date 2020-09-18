import React from 'react';

import { useBannerScroll } from 'helpers/frontEndHooks';
import { useWindowDimensions } from 'helpers/hooks';

import HowItWorksBanner from './HowItWorksBanner';
import HowItWorksSections from './HowItWorksSections';

const HowItWorks = () => {
    const { width } = useWindowDimensions();
    useBannerScroll(width);

    return (
        <div id="how-it-works">
            <HowItWorksBanner />
            <HowItWorksSections />
        </div>
    );
};

export default HowItWorks;
