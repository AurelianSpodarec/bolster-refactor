import React, { useEffect, useRef, useState } from 'react';
import {connect} from 'react-redux';
import { Events, animateScroll as scroll } from 'react-scroll';

import setIsBannerScrolling from 'actions/frontEnd/banners/sync/setIsBannerScrolling';

import items from 'constants/frontEnd/timeline';

import HowItWorksTimeline from '../presentational/HowItWorksTimeline';

const HowItWorksTimelineContainer = ({ setIsBannerScrolling }) => {
    const [activeIndex, _setActiveIndex] = useState(0);
    const activeIndexRef = useRef(activeIndex);
    const lastScrollTopRef = useRef(window.pageYOffset || document.documentElement.scrollTop);

    useEffect(() => {
        let section = window;

        if (window.innerWidth >= 1100) {
            section = document.getElementById('how-it-works-sections');

            section.addEventListener('scroll', scrollToTop);
            Events.scrollEvent.register('begin', function () {
                window.removeEventListener('scroll', scrollToTop);
                setIsBannerScrolling(true);
            });

            Events.scrollEvent.register('end', function () {
                window.addEventListener('scroll', scrollToTop);
                setLastScrollTop(window.pageYOffset || document.documentElement.scrollTop);
                setIsBannerScrolling(false);
            });
        }

        section.addEventListener('scroll', setActiveTimelineItem);

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
            window.removeEventListener('scroll', scrollToTop);
            section.removeEventListener('scroll', setActiveTimelineItem);
        };
    }, []);

    return <HowItWorksTimeline items={items} activeIndex={activeIndex} />;

    function scrollToTop() {
        const headerHeight = document.querySelector('.frontend-header').offsetHeight;
        const howItWorksSections = document.querySelector('.how-it-works-headings');
        const { top } = howItWorksSections.getBoundingClientRect();
        const duration = 1100;

        const newScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const scrollOptions = {
            duration,
            ignoreCancelEvents: true,
        };

        if (top >= headerHeight) {
            scroll.scrollToTop(scrollOptions);
        }

        setLastScrollTop(newScrollTop <= 0 ? 0 : newScrollTop); // For Mobile or negative scrolling
    }

    function setLastScrollTop(value) {
        lastScrollTopRef.current = value;
    }

    function setActiveTimelineItem() {
        const halfWindowHeight = window.innerHeight / 2 - 150;
        const footerBounds = document.querySelector('.frontend-footer').getBoundingClientRect();
        const indexOfLast = items.length - 1;

        const topValues = items.map((item, index) => {
            const itemElement = document.querySelector(`.item-container.item-${index}`);
            const { top } = itemElement.getBoundingClientRect();

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

const mapDispatchToProps = {
    setIsBannerScrolling,
};

export default connect(null, mapDispatchToProps)(HowItWorksTimelineContainer);
