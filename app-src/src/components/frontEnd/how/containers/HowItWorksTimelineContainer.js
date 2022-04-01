import React, { useEffect, useRef, useState } from 'react';

import items from 'constants/frontEnd/timeline';

import HowItWorksTimeline from '../presentational/HowItWorksTimeline';

const HowItWorksTimelineContainer = () => {
    const [activeIndex, _setActiveIndex] = useState(0);
    const activeIndexRef = useRef(activeIndex);

    useEffect(() => {
        window.addEventListener('scroll', setActiveTimelineItem);

        return () => {
            window.removeEventListener('scroll', setActiveTimelineItem);
        };
    }, []);

    return <HowItWorksTimeline items={items} activeIndex={activeIndex} />;

    function setActiveTimelineItem() {
        const halfWindowHeight = window.innerHeight / 2 - 150;
        const footerBounds = document.querySelector('.frontend-footer').getBoundingClientRect();
        const indexOfLast = items.length - 1;

        const topValues = items.map((item, index) => {
            const itemElement = document.querySelector(`.item-container.item-${index}`);
            const { top } = itemElement?.getBoundingClientRect();

            return top;
        });

        const closestToCenter = topValues.reduce((prev, curr) =>
            Math.abs(curr - halfWindowHeight) < Math.abs(prev - halfWindowHeight) ? curr : prev,
        );

        const indexOfClosest = topValues.indexOf(closestToCenter);

        if (
            footerBounds.bottom <= window.innerHeight &&
            activeIndexRef.current !== indexOfLast &&
            window.innerWidth < 1100
        ) {
            setActiveIndex(indexOfLast);
            return;
        }

        if (indexOfClosest !== activeIndexRef.current) {
            setActiveIndex(indexOfClosest);
        }
    }

    function setActiveIndex(value) {
        _setActiveIndex(value);
        activeIndexRef.current = value;
    }
};

export default HowItWorksTimelineContainer;
