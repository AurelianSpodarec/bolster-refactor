import React, { useEffect, useState } from 'react';

import items from 'constants/frontEnd/timeline';

import HowItWorksTimeline from '../presentational/HowItWorksTimeline';

const HowItWorksTimelineContainer = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', setActiveTimelineItem);

        return () => window.removeEventListener('scroll', setActiveTimelineItem);
    }, []);

    return <HowItWorksTimeline items={items} activeIndex={activeIndex} />;

    function setActiveTimelineItem() {
        const sections = document.querySelector('.how-it-works-sections');
        console.log(sections.getBoundingClientRect());
    }
};

export default HowItWorksTimelineContainer;
