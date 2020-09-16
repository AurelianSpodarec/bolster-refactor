import React from 'react';

import HowItWorksTimelineContainer from '../containers/HowItWorksTimelineContainer';
import HowItWorksHeadings from './HowItWorksHeadings';

const HowItWorksSections = () => (
    <div className="how-it-works-sections">
        <HowItWorksHeadings />
        <HowItWorksTimelineContainer />
    </div>
);

export default HowItWorksSections;
