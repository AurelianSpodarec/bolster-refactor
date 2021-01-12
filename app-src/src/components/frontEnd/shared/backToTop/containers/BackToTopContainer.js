import React from 'react';

import { animateScroll as scroll } from 'react-scroll';

import BackToTop from '../presentational/BackToTop';

const BackToTopContainer = ({ handleClick }) => {
    const handleScrollToTop = () => {
        const duration = 900;

        const scrollOptions = {
            duration,
            ignoreCancelEvents: true,
        };

        scroll.scrollToTop(scrollOptions);
    };

    return <BackToTop handleScrollToTop={handleClick ? handleClick : handleScrollToTop} />;
};

export default BackToTopContainer;
