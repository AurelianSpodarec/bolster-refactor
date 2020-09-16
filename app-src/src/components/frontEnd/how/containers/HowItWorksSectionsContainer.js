import React, { useEffect, useRef, useState } from 'react';

import HowItWorksSections from '../presentational/HowItWorksSections';

const HowItWorksSectionsContainer = () => {
    const [innerScrollable, _setInnerScrollable] = useState(false);
    const innerScrollableRef = useRef(innerScrollable);

    useEffect(() => {
        setShouldBeScrollable();
        window.addEventListener('scroll', setShouldBeScrollable);

        return () => window.removeEventListener('scroll', setShouldBeScrollable);
    }, []);

    return <HowItWorksSections innerScrollable={innerScrollable} />;

    function setShouldBeScrollable() {
        const headerHeight = document.querySelector('.frontend-header').offsetHeight;
        const sectionsBounds = document
            .querySelector('.how-it-works-sections')
            .getBoundingClientRect();
        const { top } = sectionsBounds;
        const { current } = innerScrollableRef;

        if (top <= headerHeight) {
            if (!current) {
                setInnerScrollable(true);
            }
        } else {
            if (current) {
                setInnerScrollable(false);
            }
        }
    }

    function setInnerScrollable(value) {
        _setInnerScrollable(value);
        innerScrollableRef.current = value;
    }
};

export default HowItWorksSectionsContainer;
