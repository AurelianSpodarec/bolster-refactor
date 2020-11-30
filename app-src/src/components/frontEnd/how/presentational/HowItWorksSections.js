import React from 'react';

import HowItWorksTimelineContainer from '../containers/HowItWorksTimelineContainer';
import HowItWorksHeadings from './HowItWorksHeadings';

const HowItWorksSections = ({ innerScrollable }) => (
    <div
        id="how-it-works-sections"
        className={`how-it-works-sections ${innerScrollable ? 'scrollable' : ''}`}
    >
        <HowItWorksHeadings />
        <HowItWorksTimelineContainer />
    </div>
);

export default HowItWorksSections;
