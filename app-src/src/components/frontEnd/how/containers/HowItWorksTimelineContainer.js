import React from 'react';

import items from 'constants/frontEnd/timeline';

import HowItWorksTimeline from '../presentational/HowItWorksTimeline';

const HowItWorksTimelineContainer = () => {
    return <HowItWorksTimeline items={items} />;
};

export default HowItWorksTimelineContainer;
