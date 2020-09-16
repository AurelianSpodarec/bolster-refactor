import React, { useEffect } from 'react';

import items from 'constants/frontEnd/timeline';

import HowItWorksTimeline from '../presentational/HowItWorksTimeline';

const HowItWorksTimelineContainer = () => {
    useEffect(() => {
        const sections = document.querySelector('.how-it-works-sections');

        sections.addEventListener('scroll', setActiveTimelineItem);

        return () => sections.removeEventListener('scroll', setActiveTimelineItem);
    }, []);

    return <HowItWorksTimeline items={items} />;

    function setActiveTimelineItem() {
        console.log('scroll yo');
    }
};

export default HowItWorksTimelineContainer;
