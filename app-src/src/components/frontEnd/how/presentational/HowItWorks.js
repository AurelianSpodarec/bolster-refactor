import React from 'react';

import { useBannerScroll } from 'helpers/frontEndHooks';

import HowItWorksBanner from './HowItWorksBanner';
import HowItWorksSections from './HowItWorksSections';

const HowItWorks = () => {
    useBannerScroll();

    return (
        <div id="how-it-works">
            <HowItWorksBanner />
            <HowItWorksSections />
        </div>
    );
};

export default HowItWorks;
