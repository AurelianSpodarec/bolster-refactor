import React from 'react';

import HowItWorksTimelineContainer from '../containers/HowItWorksTimelineContainer';
import HowItWorksHeadings from './HowItWorksHeadings';

const HowItWorksSections = ({ innerScrollable }) => (
    <div className={`how-it-works-sections ${innerScrollable ? 'scrollable' : ''}`}>
        <HowItWorksHeadings />
        <HowItWorksTimelineContainer />
    </div>
);

export default HowItWorksSections;
