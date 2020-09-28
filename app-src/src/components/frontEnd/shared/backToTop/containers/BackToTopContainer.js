import React from 'react';

import BackToTop from '../presentational/BackToTop';
import { animateScroll as scroll } from 'react-scroll';

const BackToTopContainer = () => {
    const handleScrollToTop = () => {
        const duration = 900;

        const scrollOptions = {
            duration,
            ignoreCancelEvents: true,
        };

        scroll.scrollToTop(scrollOptions);
    };

    return <BackToTop handleScrollToTop={handleScrollToTop} />;
};

export default BackToTopContainer;
